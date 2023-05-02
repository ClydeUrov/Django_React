import { render, screen } from "../../../helpers/test-utils";
import userEvent from '@testing-library/user-event';
import RegistrationForm from "../RegistrationForm";
import { faker } from "@faker-js/faker";
import userFixtures from "../../../helpers/fixtures/user";

const userData = userFixtures();

test("renders Login form", async () => {
    const user = userEvent;
    render(<RegistrationForm />);

    const registrationForm = screen.getByTestId("registration-form");
    expect(registrationForm).toBeInTheDocument();

    const firstnameField = screen.getByTestId("first_name-field");
    expect(firstnameField).toBeInTheDocument();

    const lastnameField = screen.getByTestId("last_name-field");
    expect(lastnameField).toBeInTheDocument();

    const emailField = screen.getByTestId("email-field");
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getByTestId("password-field");
    expect(passwordField).toBeInTheDocument();

    const bioField = screen.getByTestId("bio-field");
    expect(bioField).toBeInTheDocument();

    const password = faker.lorem.slug(2);
    await user.type(firstnameField, userData.first_name);
    await user.type(lastnameField, userData.last_name);
    await user.type(emailField, userData.email);
    await user.type(passwordField, password);
    await user.type(bioField, userData.bio);

    expect(firstnameField.value).toBe(userData.first_name);
    expect(lastnameField.value).toBe(userData.last_name);
    expect(emailField.value).toBe(userData.email);
    expect(passwordField.value).toBe(password);
    expect(bioField.value).toBe(userData.bio);
});