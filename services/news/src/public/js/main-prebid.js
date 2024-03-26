var div_1_sizes = [
    [300, 250],
    [300, 600]
];
var div_2_sizes = [
    [728, 90],
    [970, 250]
];
var PREBID_TIMEOUT = 1000;
var FAILSAFE_TIMEOUT = 3000;

var adUnits = [
    {
        code: '/28711954/paapi-testing',
        mediaTypes: {
            banner: {
                sizes: [300, 250]
            }
        },
        bids: [{
            bidder: 'gumgum',
            params: {
                zone: 'px7hhi8c', // provided by GUMGUM
                slot: '493655' // provided by GUMGUM
            }
        }]
    },
];

// ======== DO NOT EDIT BELOW THIS LINE =========== //
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function () {
    googletag.openConsole();
    googletag.pubads().disableInitialLoad();
});

var pbjs = pbjs || {};
pbjs.setConfig({ debug: true });

pbjs.que = pbjs.que || [];

pbjs.que.push(() => {
    pbjs.setConfig({
        fledgeForGpt: {
            enabled: true,
            bidders: ['gumgum'],
            defaultForSlots: 1
        }
    });
    // pbjs.setBidderConfig({
    //     bidders: ["gumgum"],
    //     config: {
    //         fledgeEnabled: true
    //     }
    // });
});

pbjs.que.push(function () {
    pbjs.addAdUnits(adUnits);
    pbjs.requestBids({
        bidsBackHandler: initAdserver,
        timeout: PREBID_TIMEOUT
    });
});

function initAdserver() {
    if (pbjs.initAdserverSet) return;
    pbjs.initAdserverSet = true;
    googletag.cmd.push(function () {
        pbjs.que.push(function () {
            pbjs.setTargetingForGPTAsync();
            googletag.pubads().refresh();
        });
    });
}
// in case PBJS doesn't load
setTimeout(function () {
    initAdserver();
}, FAILSAFE_TIMEOUT);

googletag.cmd.push(function () {
    googletag.defineSlot('/28711954/paapi-testing', div_1_sizes, 'div-1').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    // googletag.pubads().setTargeting('fledge', 'true');
    googletag.enableServices();
});
// googletag.cmd.push(function () {
//     googletag.defineSlot('/19968336/header-bid-tag-1', div_2_sizes, 'div-2').addService(googletag.pubads());
//     googletag.pubads().enableSingleRequest();
//     googletag.enableServices();
// });