from rest_framework_nested import routers

from core.auth.viewsets import LoginViewSet, RegisterViewSet, RefreshViewSet, LogoutViewSet
from core.comment.viewsets import CommentViewSet
from core.interest.viewsets import InterestViewSet
from core.post.viewsets import PostViewSet
from core.user.viewsets import UserViewSet

router = routers.SimpleRouter()

router.register(r'user', UserViewSet, basename='user')

router.register(r'register', RegisterViewSet, basename='auth-register')
router.register(r'login', LoginViewSet, basename='auth-login')
router.register(r'refresh', RefreshViewSet, basename='auth-refresh')
router.register(r'logout', LogoutViewSet, basename='auth-logout')

router.register(r'post', PostViewSet, basename='post')

router.register(r'interest', InterestViewSet, basename='interest')

posts_router = routers.NestedSimpleRouter(router, r'post', lookup='post')
posts_router.register(r'comment', CommentViewSet, basename='post-comment')

urlpatterns = [
    *router.urls,
    *posts_router.urls
]
