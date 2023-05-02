import { render, screen } from "../../../helpers/test-utils";
import Comment from "../Comment";
import { setUserData } from "../../../hooks/user.actions";
import userFixtures from "../../../helpers/fixtures/user";
import postFixtures from "../../../helpers/fixtures/post";
import commentFixtures from "../../../helpers/fixtures/comment";

const userData = userFixtures();

const postData = postFixtures(true, false, userData);

const commentData = commentFixtures(true, false, userData, postData);

beforeEach(() => {
    // to fully reset the state between __tests__, clear the storage
    localStorage.clear();
    // and reset all mocks
    jest.clearAllMocks();

    setUserData({
        user: userData,
        access: null,
        refresh: null,
    });
});

test("Render Comment component", () => {
    render(<Comment comment={commentData}/>);
    const commentElement = screen.getByTestId("comment-test");
    expect(commentElement).toBeInTheDocument();
});