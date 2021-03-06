// export default {
//     base_URL: 'http://etrix.ir/api',
//     images_URL: 'http://etrix.ir/files/partImages/',
//     datasheet_URL: 'http://etrix.ir/storage/datasheets/',
//     cm_image: 'http://etrix.ir/',
//     home: '/home',
//     get_more_content: '/more-content',
//     get_videos: '/videos',
//     get_more_videos: '/more-videos', // num(starts from 1) => 10*num videos
//     product: '/get-price',
//     send_cart_to_server: '/user/cart/add',
//     react_search_url: 'http://etrix.ir/search/',
//     search_part: '/search-part?keyword=',
//     search_part_category: '/search-part-comp?',
//     product_get_price: '/get-price', // keyword => price
//     admin_log_in: '/admin/login',
//     admin_control_panel: '/admin/control-panel',
//     admin_control_cm_delete: '/admin/cm/delete',
//     admin_control_cm_register: '/admin/cm/register',
//     cm_login: '/cm/login',
//     cm_add_content: '/cm/content/add',
//     cm_add_image: '/cm/image/add',
//     cm_get_images: '/cm/image/get?token=',
//     cm_get_content: '/cm/content/get',
//     cm_get_ordersList: '/cm/ordersList', // ordersNameList => get Array list
//     user_cart_create: '/user/cart/create',
//     user_cart_read: '/user/cart/read',
//     user_cart_remove: '/user/cart/edit', // token, keyword, project  => return cart
//     user_cart_submit: '/user/cart/price', // token => price, factor number
//     user_get_pre_factor: '/user/cart/order-bill', // token => pre factor
//     user_cart_confirm: '/user/cart/confirm', // token
//     user_get_orders: '/user/bom', //token => all orders
//     user_get_bill: '/user/bill', // token , factor number => get bill
//     user_logout: '/logout',
//     user_login: '/user/login',
//     user_google_signup: 'http://etrix.ir/login/google',
//     user_register: '/user/register',
//     user_forgotPassword: '/user/forgotPassword',
//     user_create_project: '/user/project/create', // token , name
//     user_get_projects: '/user/project/read', //  token => projects
//     user_delete_project: '/user/project/delete', //  token, project => projects
//     user_get_projects_detail: '/user/project/detail', //  token, project => project detail
//     user_get_data: '/user/data',  // token => get user data and token
//     user_set_order_address: '/user/cart/address', // post token, address,
//     get_cities_name: '/city', //get ?province=provinceName =>  cities name
//     get_province_name: '/province', //  get province name
//     get_address_tag: '/user/cart/get-address-tag', // get address tag
//     get_products_category: '/subMenu',  //
//     // get_products_form_category: '/product-menu',  // /categoryMenu/subCategory
//     // get_products_form_category: '/categoryMenu',  // /categoryMenu/subCategory
//     get_products_form_category: '/subCategory', // localhost/api/subcategory-menu?subcategory=Clock_Buffers_Drivers&category=Clock_Timing&num=1
//     get_products_form_two_category: '/categoryMenu', // localhost/api/category-menu?category=Clock_Timing&num=1
//     add_product: '/add-parts',
//     get_category_columns: '/get-columns?category='
// }

export default {
    base_URL: 'http://localhost:80/api',
    images_URL: 'http://localhost/files/partImages/',
    cm_image: 'http://localhost:80/',
    datasheet_URL: 'http://localhost/storage/datasheets/',
    home: '/home',
    get_more_content: '/more-content',
    get_videos: '/videos',
    get_more_videos: '/more-videos', // num(starts from 1) => 10*num videos
    product: '/get-price',
    send_cart_to_server: '/user/cart/add',
    react_search_url: 'http://localhost:80/search/',
    search_part: '/search-part?keyword=',
    search_part_category: '/search-part-comp?',
    product_get_price: '/get-price', // keyword => price
    admin_log_in: '/admin/login',
    admin_control_panel: '/admin/control-panel',
    admin_control_cm_delete: '/admin/cm/delete',
    admin_control_cm_register: '/admin/cm/register',
    cm_login: '/cm/login',
    cm_add_content: '/cm/content/add',
    cm_add_image: '/cm/image/add',
    cm_get_images: '/cm/image/get?token=',
    cm_get_content: '/cm/content/get',
    cm_get_ordersList: '/cm/ordersList', // ordersNameList => get Array list
    user_cart_create: '/user/cart/create',
    user_cart_read: '/user/cart/read',
    user_cart_remove: '/user/cart/edit', // token, keyword, project  => return cart
    user_cart_submit: '/user/cart/price', // token => price, factor number
    user_get_pre_factor: '/user/cart/order-bill', // token => pre factor
    user_cart_confirm: '/user/cart/confirm', // token
    user_get_orders: '/user/bom', //token => all orders
    user_get_bill: '/user/bill', // token , factor number => get bill
    user_logout: '/logout',
    user_login: '/user/login',
    user_google_signup: 'http://localhost:80/login/google',
    user_register: '/user/register',
    user_create_project: '/user/project/create', // token , name
    user_get_projects: '/user/project/read', //  token => projects
    user_delete_project: '/user/project/delete', //  token, project => projects
    user_get_projects_detail: '/user/project/detail', //  token, project => project detail
    user_get_data: '/user/data',  // token => get user data and token
    user_set_order_address: '/user/cart/address', // post token, address,
    get_cities_name: '/city', //get ?province=provinceName =>  cities name
    get_province_name: '/province', //  get province name
    get_address_tag: '/user/cart/get-address-tag', // get address tag
    // get_tell_name: '/tell', // get tell
    // get_postCode_name: '/postCode', // get postCode
    // get_subject_name: '/subject', // get subject
    get_products_category: '/subMenu',  //
    // get_products_form_category: '/product-menu',  // /categoryMenu/subCategory
    // get_products_form_category: '/categoryMenu',  // /categoryMenu/subCategory
    get_products_form_category: '/subCategory', // localhost/api/subcategory-menu?subcategory=Clock_Buffers_Drivers&category=Clock_Timing&num=1
    get_products_form_two_category: '/categoryMenu', // localhost/api/category-menu?category=Clock_Timing&num=1
    add_product: '/add-parts',
    get_category_columns: '/get-columns?category='
}