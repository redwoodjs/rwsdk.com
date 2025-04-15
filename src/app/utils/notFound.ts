export function notFound() {
    return new Response(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>404 Not Found | RedwoodSDK</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
                <style>
                    body {
                        font-family: 'Chivo', sans-serif;
                        background-color: #F5F5F0;
                        margin: 0;
                        padding: 0;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                    }
                    .container {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 2rem;
                        gap: 4rem;
                    }
                    .image-container {
                        flex: 1;
                        max-width: 500px;
                    }
                    .image-container img {
                        width: 100%;
                        height: auto;
                    }
                    .content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        max-width: 500px;
                    }
                    .logo {
                        width: 200px;
                        height: auto;
                        margin-bottom: 2rem;
                    }
                    h1 {
                        font-family: 'Jersey 10', sans-serif;
                        font-size: 8rem;
                        color: #1A1A1A;
                        margin-bottom: 1rem;
                        line-height: 1;
                    }
                    p {
                        font-size: 1.5rem;
                        color: #666;
                        margin-bottom: 2rem;
                    }
                    a {
                        background-color: #FF6B00;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border-radius: 0.5rem;
                        text-decoration: none;
                        transition: background-color 0.2s;
                    }
                    a:hover {
                        background-color: #FF8533;
                    }
                    @media (max-width: 768px) {
                        .container {
                            flex-direction: column;
                            gap: 2rem;
                        }
                        .content {
                            align-items: center;
                            text-align: center;
                        }
                    }
                </style>
                <link href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;500;600;700&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Jersey+10&display=swap" rel="stylesheet">
            </head>
            <body>
                <div class="container">
                    <div class="content">
                        <img src="/images/logo--light.svg" alt="RedwoodSDK Logo" class="logo">
                        <h1>404</h1>
                        <p>Oops! The page you're looking for doesn't exist.</p>
                        <a href="/">Return Home</a>
                    </div>
                    <div class="image-container">
                        <img src="https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/6604e363-18fa-4429-f9bd-72e0919f7c00/public" alt="404 Illustration">
                    </div>
                </div>
            </body>
        </html>
    `, {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
    });
} 