def accessible_modules(request):
    print("::::::::::::::::::::::::::::::member_modules::::::::::::::::",request.user.member_modules)
    print("::::::::::::::::::::::::::::::::::admin_modules::::::::::::",request.user.admin_modules)
    print("::::::::::::::::::::::::::::::::::owner_modules::::::::::::",request.user.owner_modules)
    return {
        "MY_CUSTOM_NAME":"Aftab"
    }