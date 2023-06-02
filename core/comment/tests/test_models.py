import pytest

from core.comment.models import Comment
from core.fixtures.post import post
from core.fixtures.post import user


@pytest.mark.django_db
def test_create_comment(post, user):
    comment = Comment.objects.create(author=user, post=post, body="My greate comment!")
    assert comment.body == "My greate comment!"
    assert comment.author == user
    assert comment.post == post

