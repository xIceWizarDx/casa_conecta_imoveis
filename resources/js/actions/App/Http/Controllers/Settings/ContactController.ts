import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\ContactController::update
* @see app/Http/Controllers/Settings/ContactController.php:24
* @route '/api/admin/settings/contact'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/api/admin/settings/contact',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\ContactController::update
* @see app/Http/Controllers/Settings/ContactController.php:24
* @route '/api/admin/settings/contact'
*/
update.url = (options?: RouteQueryOptions) => {




    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ContactController::update
* @see app/Http/Controllers/Settings/ContactController.php:24
* @route '/api/admin/settings/contact'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\ContactController::update
* @see app/Http/Controllers/Settings/ContactController.php:24
* @route '/api/admin/settings/contact'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ContactController::update
* @see app/Http/Controllers/Settings/ContactController.php:24
* @route '/api/admin/settings/contact'
*/
updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Settings\ContactController::show
* @see app/Http/Controllers/Settings/ContactController.php:11
* @route '/api/settings/contact'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/settings/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ContactController::show
* @see app/Http/Controllers/Settings/ContactController.php:11
* @route '/api/settings/contact'
*/
show.url = (options?: RouteQueryOptions) => {




    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ContactController::show
* @see app/Http/Controllers/Settings/ContactController.php:11
* @route '/api/settings/contact'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ContactController::show
* @see app/Http/Controllers/Settings/ContactController.php:11
* @route '/api/settings/contact'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ContactController::show
* @see app/Http/Controllers/Settings/ContactController.php:11
* @route '/api/settings/contact'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ContactController::show
* @see app/Http/Controllers/Settings/ContactController.php:11
* @route '/api/settings/contact'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ContactController::show
* @see app/Http/Controllers/Settings/ContactController.php:11
* @route '/api/settings/contact'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const ContactController = { update, show }

export default ContactController