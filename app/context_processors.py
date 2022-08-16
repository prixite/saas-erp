def accessible_modules(request):

    is_allowed = False
    module = None

    if request.user.is_authenticated:
        if request.user.is_superuser:
            is_allowed = True

        if module in [x.slug for x in request.user.member_modules]:
            if module in [x.slug for x in request.user.admin_modules]:
                is_allowed = True
            if module in [x.slug for x in request.user.owner_modules]:
                is_allowed = True

    return {"is_allowed": is_allowed}
