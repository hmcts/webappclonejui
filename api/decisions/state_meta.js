module.exports = {

    //
    // The data below is a stub of ui Controls data
    // Dmitry please change according to your needs, and remove that comment
    //
    pages: {
        decision: {
            uiControls: [
                {
                    control: 'dmitry-radio'
                },
                {
                    control: 'dmitry-button',
                    onClickEvent: 'continue'
                }
            ]
        },
        'reject-reasons': {
            uiControls: [
                {
                    control: 'partiesNeedAttend',
                    dataKey: 'partiesNeedAttend',
                    text: 'The parties need to attend a hearing'
                },
                {
                    control: 'capitalPositions',
                    dataKey: 'capitalPositions',
                    text: 'The parties need to attend a hearing 2'
                }
            ]
        }
    }
};
