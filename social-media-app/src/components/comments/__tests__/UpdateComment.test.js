import { render, screen, fireEvent } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import UpdateComment from "../UpdateComment";
import userFixtures from "../../../helpers/fixtures/user";
import postFixtures from "../../../helpers/fixtures/post";
import commentFixtures from "../../../helpers/fixtures/comment";
import { faker } from "@faker-js/faker";
import { act } from "react-dom/test-utils";

const userData = userFixtures();
const postData = postFixtures(true, false, userData);
const commentData = commentFixtures(true, false, userData, postData);

test("Render UpdateComment component", async () => {
    const user = userEvent;
    render(<UpdateComment post={postData} comment={commentData} />);

    const showModalForm = screen.getByTestId("show-modal-form")
    expect(showModalForm).toBeInTheDocument();

    fireEvent.click(showModalForm);

    const updateFormElement = screen.getByTestId("update-comment-form");
    expect(updateFormElement).toBeInTheDocument();

    const commentBodyField = screen.getByTestId("comment-body-field");
    expect(commentBodyField).toBeInTheDocument();

    const submitButton = screen.getByTestId("update-comment-submit");
    expect(submitButton).toBeInTheDocument();

    const commentBody = faker.lorem.sentence(10);
    await act(async () => {
        await user.type(commentBodyField, commentBody);
    });

    // Checking if field has the text and button is not disabled
    expect(commentBodyField.value).toBe(commentData.body + commentBody);
    expect(submitButton.disabled).toBeFalsy();
});