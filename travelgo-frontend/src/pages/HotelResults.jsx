import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Star } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import Button from '../components/common/Button';

export default function HotelResults() {
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
                            <span>Hotel Options</span>
                        </motion.h1>
                        <p className="text-gray-500 mt-2 font-medium">
                            Showing options in <span className="text-blue-600">{searchParams.dest || 'Anywhere'}</span>
                        </p>
                    </div>
                    <Button variant="outline" icon={ArrowLeft} onClick={() => navigate('/')}>Modify Search</Button>
                </div>

                <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                    {searchResults.length > 0 ? (
                        searchResults.map((hotel) => (
                            <motion.div key={hotel.id} variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all flex flex-col md:flex-row">
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                                            <span className="flex items-center space-x-1 text-sm font-semibold text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span>{hotel.rating}</span>
                                            </span>
                                        </div>
                                        <p className="text-gray-500 mt-1">{hotel.type} Property</p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {hotel.amenities?.map((amenity, idx) => (
                                                <span key={idx} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{amenity}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center items-center md:items-end min-w-[200px]">
                                    <p className="text-sm text-gray-500 mb-1">Per night</p>
                                    <p className="text-2xl font-bold text-gray-900 mb-4">₹{hotel.price.toLocaleString()}</p>
                                    <Button variant="primary" className="w-full" onClick={() => handleSelectBooking(hotel)}>Book Now</Button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">No hotels found</h3>
                            <p className="text-gray-500 mt-2 max-w-xs mx-auto">Try changing your dates or location.</p>
                            <Button variant="primary" className="mt-6" onClick={() => navigate('/')}>Try Again</Button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
