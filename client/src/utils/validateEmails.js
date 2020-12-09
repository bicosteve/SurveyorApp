const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmails = (emails) => {
    const invalidEmails = emails
        .split(',')
        .map((email) => email.trim())
        .filter((email) => {
            return re.test(email) === false;
        });

    if (invalidEmails.length) {
        return `Invalid emails. Last email should not have a trailing comma: ${invalidEmails}`;
    }

    return;
};

export default validateEmails;

//emailregex
