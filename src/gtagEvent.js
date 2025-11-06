// log the pageview with their url
export const pageview = (url) => {
    window.gtag('config', import.meta.env.VITE_GTM_ID, {
        page_path: url
    });
} 

// log specific events
export const event = ({ action, params }) => {
    window.gtag('event', action, params);
}
