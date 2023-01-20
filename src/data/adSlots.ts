export interface Slot {
    id: string;
    vendor: string;
    slot: string | undefined;
    width: string | undefined;
    height: string | undefined;
    minHeight: string | undefined;
    mock: string | undefined
    min_level: number
    className: string | undefined,
    update_conditions: string | undefined,
    time_in_seconds: number,
    refresh_or_destroy: string ,
    refresh_code: string ,
    destroy_code: string
}

export const PREFIX = 'proper-ad-';

export const rightSlot: Slot[] = [
    {
        id: 'trivianerds_right_rail_top',
        slot: 'right_rail_upper',
        width: '300px',
        height: 'auto',
        vendor: 'proper',
        min_level: 20,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot,
    {
        id: 'trivianerds_right_rail_middle',
        slot: 'right_rail_middle',
        width: '300px',
        height: 'auto',
        vendor: 'proper',
        min_level: 15,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot,
    {
        id: 'trivianerds_right_rail_bottom',
        slot: 'right_rail_bottom',
        width: '300px',
        height: 'auto',
        vendor: 'proper',
        min_level: 10,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot,
];


export const aboveScoreSlot: Slot[] = [
    {
        id: 'trivianerds_above_score',
        slot: 'above_score',
        width: '100%',
        height: 'auto',
        vendor: 'outbrain',
        min_level: 5,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export const aboveCorrectAnswerSlot: Slot[] = [
    {
        id: 'trivianerds_above_correct_answer',
        slot: 'above_correct_answer',
        width: '100%',
        height: 'auto',
        vendor: 'outbrain',
        min_level: 5,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];


export const aboveHeadlineSlot: Slot[] = [
    {
        id: 'trivianerds_above_headline',
        slot: 'above_headline',
        width: '100%',
        height: 'auto',
        vendor: 'outbrain',
        min_level: 5,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];


export const belowHeadlineSlot: Slot[] = [
    {
        id: 'trivianerds_below_headline',
        width: '100%',
        height: 'auto',
        vendor: 'outbrain',
        min_level: 5,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export const belowCorrectAnswerSlot: Slot[] = [
    {
        id: 'trivianerds_below_answer_explain',
        slot: 'below_answer_explain',
        width: '100%',
        height: 'auto',
        vendor: 'proper',
        min_level: 5,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export const belowAnswerExplainSlot: Slot[] = [
    {
        id: 'trivianerds_inttop',
        slot: 'below_answer_explain',
        width: '100%',
        height: 'auto',
        vendor: 'proper',
        min_level: 3,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export const belowQuestionSlot: Slot[] = [
    {
        id: 'trivianerds_below_question',
        slot: 'below_question',
        width: '100%',
        height: 'auto',
        vendor: 'outbrain',
        min_level: 15,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export const pageLevel1: Slot[] = [
    {
        id: 'trivianerds_page_level_1',
        slot: 'page_level_1',
        width: '100%',
        height: 'auto',
        vendor: 'proper',
        min_level: 15,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export const pageLevel2: Slot[] = [
    {
        id: 'trivianerds_page_level_2',
        slot: 'page_level_2',
        width: '100%',
        height: 'auto',
        vendor: 'proper',
        min_level: 15,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export const pageLevel3: Slot[] = [
    {
        id: 'trivianerds_page_level_3',
        slot: 'page_level_3',
        width: '100%',
        height: 'auto',
        vendor: 'proper',
        min_level: 15,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export const aboveButtonSlot: Slot[] = [
    {
        id: 'trivianerds_above_buttons',
        slot: 'above_buttons',
        width: '100%',
        height: 'auto',
        vendor: 'outbrain',
        min_level: 10,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export const belowButtonSlot: Slot[] = [
    {
        id: 'trivianerds_below_buttons',
        slot: 'below_buttons',
        width: '100%',
        height: 'auto',
        vendor: 'outbrain',
        min_level: 10,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export const belowButtonSlot2: Slot[] = [
    {
        id: 'trivianerds_below_buttons_2',
        slot: 'below_buttons_2',
        width: '100%',
        height: 'auto',
        vendor: 'proper',
        min_level: 10,
        className: 'ad-slot-content-well',
        // time_in_seconds: 20,
        // refresh_or_destroy:'refresh'
    } as Slot
];

export function renderProperStickyAd(show: boolean, adData?: { code: string, min_level: number, label: number }) {
    const existingSticky = document.getElementById('proper-sticky-ad');
    if (existingSticky) return;
    /*if (existingSticky &&  existingSticky.parentNode) {
        existingSticky.parentNode.removeChild(existingSticky);
    }*/
    if (!show) return;
    // document.body.insertAdjacentHTML('afterbegin',
    //     `<div class="proper-ad-unit ad-sticky" id="proper-sticky-ad" style="display:none;z-index: 10">
    //         <div id="proper-ad-trivianerds_dynamic_sticky"></div>
    //     </div>`
    // );

    if (adData) {
        setTimeout(() => {
            const existingSticky = document.getElementById('proper-sticky-ad');
            if (existingSticky) {
                const script = document.createElement("div");
                script.insertAdjacentHTML('afterbegin', adData.code);
                existingSticky.appendChild(script);
            }
        }, 0)
    } else {
        setTimeout(() => {
            // @ts-ignore
            //commented this part due to propertag error
            // propertag.cmd.push(function() {
            //     // @ts-ignore
            //     proper_display('trivianerds_dynamic_sticky');
            // });
        }, 0)
    }
}

export function runProperTag() {
    const prevTag = document.getElementById('proper-tag');
    if (prevTag && prevTag.parentNode) {
        prevTag.parentNode.removeChild(prevTag);
    }
    var s = document.createElement('script');
    s.id = 'proper-tag'
    s.type = 'text/javascript';
    var code = `var propertag = propertag || {};
    propertag.cmd = propertag.cmd || [];
    (function () {
        var pm = document.createElement('script');
        pm.async = true;
        pm.type = 'text/javascript';
        var is_ssl = 'https:' == document.location.protocol;
        pm.src = (is_ssl ? 'https:' : 'http:') + '//global.proper.io/trivianerds.min.js';
        var node = document.getElementsByTagName('script')[0];
        // @ts-ignore
        node.parentNode.insertBefore(pm, node);
    })();`;
    try {
        s.appendChild(document.createTextNode(code));
        document.head.appendChild(s);
        console.log('runProperTag', s);
    } catch (e) {
        s.text = code;
        document.head.appendChild(s);
    }
}

export function removeGTM() {
    // @ts-ignore
    window.dataLayer = undefined;
    const prevTag = document.getElementById('gtm-tag');
    if (prevTag && prevTag.parentNode) {
        prevTag.parentNode.removeChild(prevTag);
    }
}

export function runGTM() {
    var s = document.createElement('script');
    s.id = 'gtm-tag'
    s.type = 'text/javascript';
    var code = `(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start':
                new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-M5CTLQH');`;
    try {
        s.appendChild(document.createTextNode(code));
        document.head.appendChild(s);
    } catch (e) {
        s.text = code;
        document.head.appendChild(s);
    }
}

export function removeProperStickyAd() {
    const existingSticky = document.getElementById('proper-sticky-ad');
    if (existingSticky && existingSticky.parentNode) {
        existingSticky.parentNode.removeChild(existingSticky);
    }
}
