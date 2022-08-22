def accessible_modules(request):

    allowed_modules = []

    if request.user.is_authenticated:
        allowed_modules.extend([x.slug for x in request.user.member_modules])
        allowed_modules.extend([x.slug for x in request.user.admin_modules])
        allowed_modules.extend([x.slug for x in request.user.owner_modules])

    return {"allowed_modules": list(set(allowed_modules))}
