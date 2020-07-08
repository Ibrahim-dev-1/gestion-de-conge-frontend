import React from 'react';
import MainFooter from '../components/MainFooter'
import MainHeader from '../components/MainHeader'
import MainSidebar from '../components/MainSidebar'
import ContentWrapper from '../components/ContentWrapper'


 const Dashboard = () => {
    return (
        <div className="wrapper">
            <MainHeader />
            <MainSidebar />
            <ContentWrapper />
            <MainFooter />
        </div>
    )
}

export default Dashboard;