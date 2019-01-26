const fs2 = require('fs');
const path = require('path');
const sm = require('sitemap');
const React= require('react');
const siteMap = require('react-router-sitemap');
const parseRoutes = siteMap.routesParser;
const filterPaths = siteMap.pathsFilter;
const applyParams = siteMap.paramsApplier;
const buildSitemap = siteMap.sitemapBuilder;
// import { routesParser as parseRoutes, pathsFilter as filterPaths, paramsApplier as applyParams, sitemapBuilder as buildSitemap } from 'react-router-sitemap';
const jsxroutes = require('./Routes.js');

const splitPaths = (paths, size) => paths.map((path, i) => {
    return (i % size === 0) ? paths.slice(i, i + size) : null;
}).filter(e => e);

function isValidChild(object) {
    return object == null || React.isValidElement(object)
}

export function isReactChildren(object) {
    return isValidChild(object) || (Array.isArray(object) && object.every(isValidChild))
}

function createRoute(defaultProps, props) {
    return { ...defaultProps, ...props }
}

export function createRouteFromReactElement(element) {
    const type = element.type;
    const route = createRoute(type.defaultProps, element.props);

    if (route.children) {
        const childRoutes = createRoutesFromReactChildren(route.children, route);

        if (childRoutes.length)
            route.childRoutes = childRoutes;

        delete route.children
    }

    return route
}

/**
 * Creates and returns a routes object from the given ReactChildren. JSX
 * provides a convenient way to visualize how routes in the hierarchy are
 * nested.
 *
 *   import { Route, createRoutesFromReactChildren } from 'react-router'
 *
 *   const routes = createRoutesFromReactChildren(
 *     <Route component={App}>
 *       <Route path="home" component={Dashboard}/>
 *       <Route path="news" component={NewsFeed}/>
 *     </Route>
 *   )
 *
 * Note: This method is automatically used when you provide <Route> children
 * to a <Router> component.
 */
export function createRoutesFromReactChildren(children, parentRoute) {
    const routes = []

    React.Children.forEach(children, function (element) {
        if (React.isValidElement(element)) {
            // Component classes may have a static create* method.
            if (element.type.createRouteFromReactElement) {
                const route = element.type.createRouteFromReactElement(element, parentRoute)

                if (route)
                    routes.push(route)
            } else {
                routes.push(createRouteFromReactElement(element))
            }
        }
    })

    return routes
}

/**
 * Creates and returns an array of routes from the given object which
 * may be a JSX route, a plain object route, or an array of either.
 */
export function createRoutes(routes) {
    if (isReactChildren(routes)) {
        routes = createRoutesFromReactChildren(routes)
    } else if (routes && !Array.isArray(routes)) {
        routes = [ routes ]
    }

    return routes
}

/**
 * @class Sitemap
 * @description Generate a sitemap using the [React Router](https://www.npmjs.com/package/react-router) configuration.
 *
 * @example
 * import Sitemap from 'react-router-sitemap';
 *
 * const sitemap = (
 *   new Sitemap(<Route path='/home'>)
 *     .build('http://my-site.ru')
 *     .save("./sitemap.xml");
 * );
 */
class Sitemap {

    /**
     * @constructor
     * @description Convert a React Router config to an array of paths.
     * @param {Route} router - React Router configuration.
     *
     * @example
     * import Sitemap from 'react-router-sitemap';
     *
     * const sitemap = new Sitemap(<Route path='/home'>);
     */
    constructor(router) {

        if (!router) {
            throw new Error('Need pass router in module');
        }

        const routes = createRoutes(router);

        this.paths = parseRoutes(routes);


        return this;

    }

    /**
     * @description Filter paths using the specified rules.
     * @param {Object} filterConfig - Filter configuration
     * @property {Array<RegExp>} rules - List filter rules.
     * @property {Boolean} isValid - Flag that defines a way to filter paths.
     * If `true`, the path satisfying the rules will be included.
     * If `false`, the path satisfying the rules will be excluded.
     *
     * @example
     * <caption>Config for exclude `/auth` and `/thanks`</caption>
     * { isValid: false, rules: [/\/auth/, /\/thanks/] }
     *
     * @example
     * <caption>Config for include `/auth` and `/thanks`</caption>
     * { isValid: true, rules: [/\/auth/, /\/thanks/] }
     */
    filterPaths(filterConfig) {

        this.paths = filterPaths(
            this.paths,
            filterConfig.rules,
            filterConfig.isValid || false
        );

        return this;

    }

    /**
     * @description Replace the dynamic parameters in paths using the given values.
     * @param {Object.<String, Array>} paramsConfig - Configuration for replacing params.
     *
     * @example
     * <caption>Config for replacing params `:param` in the path `/path/:param`</caption>
     * {
     *   '/path/:param': [
     *     { param: 'value' }
     *   ]
     * }
     *
     * @example
     * <caption>Config for replacing params `:param` and `:subparam`
     * in the path `/path/:param/:subparam`</caption>
     * {
     *   '/path/:param/:subparam': [
     *     { param: 'value', subparam: ['subvalue1', 'subvalue2'] }
     *   ]
     * }
     *
     */
    applyParams(paramsConfig) {
        this.paths = applyParams(this.paths, paramsConfig);
        return this;
    }

    /**
     * @description Convert array of paths to sitemap.
     * @param {String} hostname - The root name of your site.
     */
    build(hostname, { limitCountPaths = 49999 } = {}) {
        this.hostname = hostname;
        this.splitted = splitPaths(this.paths, limitCountPaths);
        this.sitemaps = this.splitted.map(paths => buildSitemap(hostname, paths));
        return this;
    }

    /**
     * @description Save sitemaps and sitemap index in files.
     * @param {String} dist - The path and file name where the sitemap index is saved.
     * @param {String} publicPath - optional public path relative to hostname, default: '/'
     */
    save(dist, publicPath = '/') {
        const sitemapPaths = [];

        // sitemap index is not needed in case of one sitemap file
        if (this.sitemaps.length === 1) {
            // write sitemap
            fs2.writeFileSync(dist, this.sitemaps[0].toString());

            return this;
        }

        this.sitemaps.map((sitemap, index) => {
            const savePath = dist.replace('.xml', `-${index}.xml`);

            // write sitemap
            fs2.writeFileSync(savePath, sitemap.toString());

            // push public path for indexing
            sitemapPaths.push(this.hostname + publicPath + path.basename(savePath));
        });

        // create index string
        const sitemapIndex = sm.buildSitemapIndex({
            urls: sitemapPaths,
            hostname: this.hostname
        });

        // write sitemap index
        fs2.writeFileSync(dist, sitemapIndex);

        return this;
    }

}

(
    new Sitemap(jsxroutes({}))
        .build('https://mydomain.cc')
        .save('./build/sitemap.xml')
);