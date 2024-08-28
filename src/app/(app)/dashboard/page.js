import Header from '@/app/(app)/Header'
import Urls from '@/components/Urls'

export const metadata = {
    title: 'Laravel - Dashboard',
}

const Dashboard = () => {
    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Urls />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
