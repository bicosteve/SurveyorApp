const FIELDS = [
    { label: 'Survey Title', name: 'title', valueError: 'Provide a title' },
    { label: 'Subject Line', name: 'subject', valueError: 'Provide a subject' },
    { label: 'Email Body', name: 'body', valueError: 'Provide a body' },
    {
        label: 'Recipient List',
        name: 'recipients',
        valueError: 'Provide atleast an email',
    },
];

export default FIELDS;
