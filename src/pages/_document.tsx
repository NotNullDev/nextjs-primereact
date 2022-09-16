import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head >
                {/* TODO */}
                <link id='theme-link' rel="stylesheet" href="vela-blue.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}