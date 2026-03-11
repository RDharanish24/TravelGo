import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import TransportCard from '../components/booking/TransportCard';
import Button from '../components/common/Button';

export default function TrainResults() {
    const navigate = useNavigate();
    const { searchResults, searchParams, setSelectedItem } = useBooking();

    const handleSelectBooking = (item) => {
        setSelectedItem(item);
        navigate('/booking-summary');
    };

    const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[calc(100vh-64px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <motion.h1 initial={{ x: -20 }} animate={{ x: 0 }} className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                            <span>Train Options</span>
                        </motion.h1>
                        <p className="text-gray-500 mt-2 font-medium">
                            Showing results for <span className="text-blue-600">{searchParams.source || 'Anywhere'}</span> to <span className="text-blue-600">{searchParams.dest || 'Anywhere'}</span>
                        </p>
                    </div>
                    <Button variant="outline" icon={ArrowLeft} onClick={() => navigate('/')}>Modify Search</Button>
                </div>

                <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                    {searchResults.length > 0 ? (
                        searchResults.map((item) => (
                            <motion.div key={item.id} variants={itemVariants}>
                                <TransportCard item={item} type="train" onBook={handleSelectBooking} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">No trains found</h3>
                            <p className="text-gray-500 mt-2 max-w-xs mx-auto">Try changing your dates or locations.</p>
                            <Button variant="primary" className="mt-6" onClick={() => navigate('/')}>Try Again</Button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
