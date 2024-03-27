var div_1_sizes = [
  [300, 250],
  [300, 600],
];
var div_2_sizes = [
  [728, 90],
  [970, 250],
];
var PREBID_TIMEOUT = 1000;
var FAILSAFE_TIMEOUT = 3000;

var adUnits = [
  {
    code: '/28711954/paapi-testing',
    mediaTypes: {
      banner: {
        sizes: [300, 250],
      },
    },
    bids: [
      {
        bidder: 'gumgum',
        params: {
          zone: 'px7hhi8c', // provided by GUMGUM
          slot: '493655', // provided by GUMGUM
        },
      },
    ],
  },
];

var pbjs = pbjs || {};
pbjs.setConfig({debug: true});
pbjs.que = pbjs.que || [];
pbjs.que.push(() => {
  pbjs.setConfig({
    paapi: {
      gpt: {
        autoconfig: false,
      },
      enabled: true,
      defaultForSlots: 1,
    },
  });
});

pbjs.que.push(function () {
  pbjs.addAdUnits(adUnits);
  pbjs.requestBids({
    bidsBackHandler: initAdserver,
    timeout: PREBID_TIMEOUT,
  });
});

async function initAdserver(bidResponses) {
  if (pbjs.initAdserverSet) return;
  pbjs.initAdserverSet = true;

  const auctionConfig =
    pbjs.getPAAPIConfig()['/28711954/paapi-testing'].componentAuctions[0];
  try {
    const frameConfig = await navigator.runAdAuction(auctionConfig);
    if (frameConfig) {

        const frame = document.createElement('fencedframe');
        frame.width = 300;
        frame.height = 250;
        frame.style = 'border: none;';
        frame.config = frameConfig;
        frame.scrolling = 'no';
        document.getElementById('div-1').appendChild(frame);
        return;
    }
  } catch (error) {
    t;
    console.error('Browser ad auction error', error);
  }

  const contextualBids = bidResponses['/28711954/paapi-testing'].bids;
  if (contextualBids.length > 0) {
    const frame = document.createElement('iframe');
    frame.width = 300;
    frame.height = 250;
    frame.style = 'border: none;';
    frame.scrolling = 'no';
    frame.srcdoc = contextualBids[0].ad;
    document.getElementById('div-1').appendChild(frame);
    return;
  }
}
// in case PBJS doesn't load
setTimeout(function () {
  initAdserver();
}, FAILSAFE_TIMEOUT);
