import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\AuthSettingsController::update
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:20
 * @route '/api/admin/settings/auth'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/api/admin/settings/auth',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\AuthSettingsController::update
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:20
 * @route '/api/admin/settings/auth'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\AuthSettingsController::update
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:20
 * @route '/api/admin/settings/auth'
 */
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Settings\AuthSettingsController::update
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:20
 * @route '/api/admin/settings/auth'
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
* @see \App\Http\Controllers\Settings\AuthSettingsController::update
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:20
 * @route '/api/admin/settings/auth'
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
* @see \App\Http\Controllers\Settings\AuthSettingsController::show
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:12
 * @route '/api/settings/auth'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/settings/auth',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\AuthSettingsController::show
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:12
 * @route '/api/settings/auth'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\AuthSettingsController::show
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:12
 * @route '/api/settings/auth'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\AuthSettingsController::show
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:12
 * @route '/api/settings/auth'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\AuthSettingsController::show
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:12
 * @route '/api/settings/auth'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\AuthSettingsController::show
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:12
 * @route '/api/settings/auth'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\AuthSettingsController::show
 * @see app/Http/Controllers/Settings/AuthSettingsController.php:12
 * @route '/api/settings/auth'
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
const AuthSettingsController = { update, show }

export default AuthSettingsController