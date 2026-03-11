import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, User, Users, Calendar, Home as HomeIcon } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import Button from '../components/common/Button';

export default function BookingSummary() {
    const navigate = useNavigate();
    const { selectedItem, searchParams, confirmBooking } = useBooking();

    // If accessed directly without selecting an item, redirect back
    if (!selectedItem) {
        navigate('/');
        return null;
    }

    const isHotel = searchParams.type === 'hotel';
    const guestsOrPassengers = isHotel ? searchParams.guests : searchParams.passengers;
    const quantity = isHotel ? searchParams.rooms : searchParams.passengers;
    const totalAmount = selectedItem.price * quantity;

    const handleConfirm = () => {
        const bookingRecord = {
            id: `BK-${Math.floor(Math.random() * 1000000)}`,
            type: searchParams.type,
            itemName: selectedItem.name,
            amount: totalAmount,
            date: new Date().toISOString(),
            details: isHotel
                ? { checkIn: searchParams.checkIn, checkOut: searchParams.checkOut, rooms: searchParams.rooms }
                : { travelDate: searchParams.date, from: selectedItem.source, to: selectedItem.dest }
        };

        confirmBooking(bookingRecord);
        navigate('/dashboard'); // Take user to dashboard after success
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[calc(100vh-64px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                {/* Header */}
                <div className="bg-blue-600 p-6 text-white text-center">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-3" />
                    <h1 className="text-2xl font-bold">Booking Summary</h1>
                    <p className="text-blue-100 mt-1">Review your details before confirming</p>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    {/* Item Details */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Selected {isHotel ? 'Property' : 'Travel'}</h2>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xl font-semibold text-gray-800">{selectedItem.name}</p>
                                {!isHotel && (
                                    <p className="text-gray-500 mt-1">{selectedItem.source} → {selectedItem.dest}</p>
                                )}
                                {isHotel && (
                                    <p className="text-gray-500 mt-1">{selectedItem.type}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* User Input Details */}
                    <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-100">
                        {isHotel ? (
                            <>
                                <div className="flex items-center text-gray-700">
                                    <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                                    <span><strong>Check-in:</strong> {searchParams.checkIn || 'Not selected'}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                                    <span><strong>Check-out:</strong> {searchParams.checkOut || 'Not selected'}</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center text-gray-700">
                                        <HomeIcon className="h-5 w-5 mr-3 text-blue-600" />
                                        <span>{searchParams.rooms} Room(s)</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <Users className="h-5 w-5 mr-3 text-blue-600" />
                                        <span>{searchParams.guests} Guest(s)</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center text-gray-700">
                                    <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                                    <span><strong>Date:</strong> {searchParams.date || 'Not selected'}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <User className="h-5 w-5 mr-3 text-blue-600" />
                                    <span><strong>Passengers:</strong> {searchParams.passengers}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <span className="text-sm px-2 py-1 bg-gray-200 rounded text-gray-700 mr-3">Time</span>
                                    <span>{selectedItem.time}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="pt-4 border-t border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Details</h2>
                        <div className="flex justify-between items-center text-gray-600 mb-2">
                            <span>Base Price (x{quantity})</span>
                            <span>₹{selectedItem.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-600 mb-4">
                            <span>Taxes & Fees</span>
                            <span>₹{(totalAmount * 0.18).toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-4 border-t border-gray-100">
                            <span>Total Amount</span>
                            <span className="text-blue-600">₹{(totalAmount * 1.18).toFixed(0)}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full" onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                        <Button variant="primary" className="w-full" onClick={handleConfirm}>
                            Confirm Booking
                        </Button>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
