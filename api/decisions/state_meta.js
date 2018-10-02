//
// The data below is a stub of ui Controls data
// Data structure
// Judistdiction =>> page_id ==> pagedata
// api URL http://localhost:3000/api/decisions/state/1536577824150765/fr/create
//

module.exports = {
    fr: {
        create: {
            idPrefix: 'create',
            name: 'create',
            header: 'Do you want to approve the draft consent order?',
            groups: [
                {
                    fieldset: {
                        radios: {
                            control: 'approveDraftConsent',
                            radioGroup: [
                                {
                                    value: 'Yes',
                                    text: 'Yes'
                                },
                                {
                                    value: 'Maybe',
                                    text: 'May be',
                                    checked: true
                                },
                                {
                                    value: 'No',
                                    text: 'No'
                                }
                            ]
                        }
                    }
                }
            ],
            buttons: [
                {
                    control: 'createButton',
                    value: 'Continue',
                    onEvent: 'continue'
                }
            ]
        },
        'reject-reasons': {
            idPrefix: 'reject-reasons',
            name: 'reject-reasons'
        }
    }
};
