import { ReactNode } from 'react';
import Footer from './Footer';
import Layout from './Layout';
import Navbar from './Navbar';


export default function PageLayout({ children }: { children: ReactNode }) {
    return (
        <Layout>
            <Navbar/>
                {children}
            <Footer/>
        </Layout>
    )
  }