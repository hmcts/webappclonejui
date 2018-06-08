module.exports = {
    services: {
        ccd_data_api: "https://ccd-data-store-api-aat.service.core-compute-aat.internal",
        idam_web: "http://idam-web-public-idam-aat.service.core-compute-aat.internal",
        idam_api: "http://idam-api-idam-aat.service.core-compute-aat.internal",
        s2s: "http://rpe-service-auth-provider-aat.service.core-compute-aat.internal",
        dm_store_api: "http://dm-store-aat.service.core-compute-aat.internal",
        em_anno_api: "http://em-anno-aat.service.core-compute-aat.internal",
        em_redact_api: "http://em-redact-aat.service.core-compute-aat.internal"
    },
    microservice: "ccd_gw",
    useProxy: true,
    cookieName: '_JUI_AUTH_',
    idam_client: 'jui_webapp'
};