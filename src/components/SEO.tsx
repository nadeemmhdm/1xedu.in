import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

const SEO = ({
    title,
    description = "A premium one-to-one business networking event exclusively for educational consultants, counsellors, and education service providers.",
    keywords = "education networking, business meet, education consultants, study abroad counsellors, 1XEdu, education conference",
    image = "https://interman-server.42web.io/uploads/1xedu-event-cover-image.jpeg",
    url = "https://1xedu.in"
}: SEOProps) => {
    const siteTitle = "1XEdu Business Meet 2026";
    const fullTitle = `${title} | ${siteTitle}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Canonical URL - simplified for now, can be dynamic */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;
