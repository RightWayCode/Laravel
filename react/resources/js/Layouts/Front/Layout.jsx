import Header from './Header';
import Footer from './Footer';

export default function GuestLayout({ children }) {
    return (
        <>
            <Header />
                <main>
                    {children}
                </main>
            <Footer />
        </>
    );
}
