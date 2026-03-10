import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Dynamic params
        const title = searchParams.get('title') || 'Garden Horizons';
        const description = searchParams.get('desc') || 'Live Stock Tracking Data';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundColor: '#0a0a0a',
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        padding: '80px',
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '40px',
                        }}
                    >
                        <div
                            style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: '#4ade80',
                                marginRight: '16px',
                                boxShadow: '0 0 20px rgba(74, 222, 128, 0.8)',
                            }}
                        />
                        <span
                            style={{
                                color: '#4ade80',
                                fontSize: '28px',
                                fontWeight: 800,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                            }}
                        >
                            Live Tracker
                        </span>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '84px',
                                fontWeight: 900,
                                color: 'white',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                maxWidth: '1000px',
                                margin: 0,
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            style={{
                                fontSize: '42px',
                                color: '#a1a1aa',
                                lineHeight: 1.4,
                                maxWidth: '900px',
                                margin: 0,
                                fontWeight: 500,
                            }}
                        >
                            {description}
                        </p>
                    </div>

                    <div
                        style={{
                            marginTop: 'auto',
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '40px',
                            borderTop: '2px solid rgba(255,255,255,0.1)',
                        }}
                    >
                        <span style={{ color: '#71717a', fontSize: '32px', fontWeight: 600 }}>gagstock.gleeze.com</span>
                        <span style={{ color: '#4ade80', fontSize: '32px', fontWeight: 600 }}>Auto-refreshes every 30s</span>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch {
        return new Response('Failed to generate image', { status: 500 });
    }
}
