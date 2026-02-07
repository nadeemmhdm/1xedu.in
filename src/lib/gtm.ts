export const gtmId = import.meta.env.VITE_GTM_ID;

export const initializeGTM = () => {
    if (!gtmId) {
        console.warn("GTM ID not found in environment variables.");
        return;
    }

    (function (w: any, d: Document, s: string, l: string, i: string) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s) as HTMLScriptElement,
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode!.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', gtmId);

    // Add noscript iframe
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";

    const noscript = document.createElement('noscript');
    noscript.appendChild(iframe);
    document.body.prepend(noscript);
};
