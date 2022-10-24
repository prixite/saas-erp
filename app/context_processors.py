def accessible_modules(request):

    allowed_modules = []

    if request.user.is_authenticated:
        for module in request.user.member_modules:
            allowed_modules.append(module.slug)
        for module in request.user.admin_modules:
            allowed_modules.append(module.slug)
        for module in request.user.owner_modules:
            allowed_modules.append(module.slug)

    allowed_modules = list(set(allowed_modules))

    return {"allowed_modules": allowed_modules}
