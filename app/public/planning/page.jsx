'use client';
import { useState, useEffect } from 'react';
import { classes, heroHeaders,  } from "@/data/data";
import HeroHeader from "@/components/HeroSection";
import EnhancedPopularClasses from '@/components/popular-class';
// import { ChevronLeft, ChevronRight, Users, Clock } from 'lucide-react';

// Simuler moment.js avec Date native (plus moderne)
const moment = {
  locale: (locale) => {
    // Configuration locale française
    return moment;
  },
  format: (date, format) => {
    const d = new Date(date);
    if (format === 'MMMM YYYY') {
      return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    }
    if (format === 'ddd') {
      return d.toLocaleDateString('fr-FR', { weekday: 'short' });
    }
    return d.toLocaleDateString('fr-FR');
  },
  startOf: (date, unit) => {
    const d = new Date(date);
    if (unit === 'month') {
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    if (unit === 'week') {
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Lundi = premier jour
      return new Date(d.setDate(diff));
    }
    return d;
  },
  add: (date, amount, unit) => {
    const d = new Date(date);
    if (unit === 'month') {
      d.setMonth(d.getMonth() + amount);
    }
    if (unit === 'days') {
      d.setDate(d.getDate() + amount);
    }
    return d;
  },
  isSame: (date1, date2, unit = 'day') => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (unit === 'day') {
      return d1.toDateString() === d2.toDateString();
    }
    if (unit === 'month') {
      return d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
    }
    return false;
  }
};

export default function CalendarBookingSystem() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState({});

  // Données des cours
  const classesData = {
    '2025-01-06': [ // Lundi 6 janvier 2025
      {
        id: 1,
        time: '18:00 - 19:00',
        title: 'FULL BODY - MICRO LAGREE',
        instructor: 'with Lena Bachelier',
        capacity: '5/8',
        available: true
      },
      {
        id: 2,
        time: '19:00 - 20:00',
        title: 'FULL BODY - MICRO LAGREE',
        instructor: 'with Lena Bachelier',
        capacity: '8/8',
        available: false
      },
      {
        id: 3,
        time: '20:00 - 21:00',
        title: 'FULL BODY - MICRO LAGREE',
        instructor: 'with Lena Bachelier',
        capacity: '5/8',
        available: true
      }
    ],
    // Cours pour cette semaine
    '2025-01-07': [
      {
        id: 7,
        time: '09:00 - 10:00',
        title: 'YOGA MATINAL',
        instructor: 'with Sarah Martin',
        capacity: '3/6',
        available: true
      }
    ],
    '2025-01-08': [
      {
        id: 8,
        time: '18:30 - 19:30',
        title: 'PILATES ADVANCED',
        instructor: 'with Tom Wilson',
        capacity: '6/8',
        available: true
      }
    ],
    // Exemple pour le 4 août (comme dans l'image originale)
    '2025-09-26': [
      {
        id: 4,
        time: '18:00 - 19:00',
        title: 'FULL BODY - MICRO LAGREE',
        instructor: 'Avec Lena Bachelier',
        capacity: '5/8',
        available: true
      },
      {
        id: 5,
        time: '19:00 - 20:00',
        title: 'FULL BODY - MICRO LAGREE',
        instructor: 'Avec Lena Bachelier',
        capacity: '8/8',
        available: false
      },
      {
        id: 6,
        time: '20:00 - 21:00',
        title: 'FULL BODY - MICRO LAGREE',
        instructor: 'Avec Lena Bachelier',
        capacity: '5/8',
        available: true
      }
    ]
  };

  useEffect(() => {
    // Simuler des réservations existantes
    setBookings({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false
    });
  }, []);

  // Navigation du calendrier par semaine
  const goToPreviousWeek = () => {
    setCurrentDate(moment.add(currentDate, -7, 'days'));
  };

  const goToNextWeek = () => {
    setCurrentDate(moment.add(currentDate, 7, 'days'));
  };

  // Générer les jours de la semaine
  const generateWeekDays = () => {
    const startOfWeek = moment.startOf(currentDate, 'week');
    const days = [];

    for (let i = 0; i < 7; i++) { // 7 jours de la semaine
      const day = moment.add(startOfWeek, i, 'days');
      const isSelected = moment.isSame(day, selectedDate, 'day');
      const isToday = moment.isSame(day, new Date(), 'day');
      const hasClasses = classesData[day.toISOString().split('T')[0]];

      days.push({
        date: day,
        day: day.getDate(),
        isSelected,
        isToday,
        hasClasses: !!hasClasses
      });
    }

    return days;
  };

  // Obtenir le mois et année de la semaine courante
  const getCurrentWeekMonthYear = () => {
    return moment.format(currentDate, 'MMMM YYYY');
  };

  // Réserver un cours
  const bookClass = (classId) => {
    setBookings(prev => ({
      ...prev,
      [classId]: true
    }));
    alert('Cours réservé avec succès !');
  };

  // Obtenir les cours du jour sélectionné
  const getSelectedDayClasses = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    return classesData[dateKey] || [];
  };

  const weekDays = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'];

  return (

    <>
      
      <HeroHeader
          title={heroHeaders.planning.title}
          breadcrumbs={heroHeaders.planning.breadcrumbs}
          backgroundImage="/img/new/4.jpeg"
      />
      <div className="container py-5">

        <div className="row mb-5">
          <div className="col-12">
            <div className="text-center">
              <div className="text-center bg-primary px-5 title-line rounded-pill">
                <span className="px-5"></span>
              </div>
              <h1
                className="fw-bold pb-2"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                Réserver votre session
              </h1>
              <p
                className="text-muted"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                Réserver, plannifier vos sessions
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 bg-white mb-5">
          {/* Header du calendrier */}
          <div className="flex items-center justify-between mb-8">
            
            <button onClick={goToPreviousWeek} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <i className="bi bi-arrow-left" style={{fontSize:"35px"}}></i>
            </button>
            
            <h1 className="text-2xl font-light text-gray-800 capitalize">
              {getCurrentWeekMonthYear()}
            </h1>
           
            <button onClick={goToNextWeek} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <i className="bi bi-arrow-right" style={{fontSize:"35px"}}></i>
            </button>
            
          </div>

          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 py-3"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Vue semaine */}
          <div className="grid grid-cols-7 gap-1 mb-8">
            {generateWeekDays().map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`
                  aspect-square flex flex-col items-center justify-center p-2 text-sm transition-all duration-200 relative
                  text-gray-700 hover:bg-gray-100
                  ${day.isSelected ? 'bg-amber-600 text-white' : ''}
                  ${day.isToday && !day.isSelected ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
                `}
              >
                <span className="font-medium">{day.day}</span>
                {day.hasClasses && (
                  <div className={`absolute bottom-1 w-1 h-1 rounded-full ${
                    day.isSelected ? 'bg-white' : 'bg-amber-600'
                  }`}></div>
                )}
              </button>
            ))}
          </div>

          {/* Section des cours disponibles */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-medium text-gray-800 mb-6">
              Disponibilité pour le {selectedDate.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </h2>

            {getSelectedDayClasses().length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Aucun cours disponible pour cette date</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getSelectedDayClasses().map((classItem) => (
                  <div
                    key={classItem.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {/* Horaire */}
                    <div className="text-sm text-gray-500 w-20">
                      {classItem.time}
                    </div>

                    {/* Info du cours */}
                    <div className="flex items-center flex-1 mx-4">
                      {/* Indicateur de capacité */}
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-semibold mr-4
                        ${classItem.available ? 'bg-teal-500' : 'bg-gray-400'}
                      `}>
                        {classItem.capacity}
                      </div>

                      {/* Détails du cours */}
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {classItem.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {classItem.instructor}
                        </p>
                      </div>
                    </div>

                    {/* Bouton de réservation */}
                    <button
                      onClick={() => bookClass(classItem.id)}
                      disabled={!classItem.available || bookings[classItem.id]}
                      className={`
                        px-6 py-2 rounded-lg font-medium transition-all duration-200
                        ${classItem.available && !bookings[classItem.id]
                          ? 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-md'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                      `}
                    >
                      {bookings[classItem.id] 
                        ? 'Réservé' 
                        : classItem.available 
                          ? 'Réserver' 
                          : 'Complet'
                      }
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Légende */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-3">Légende</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-600 rounded"></div>
                <span>Jour sélectionné</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                <span>Aujourd'hui</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span>Places disponibles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>Cours complet</span>
              </div>
            </div>
          </div>
        </div>

        <EnhancedPopularClasses/>

      </div>
    </>
  );
}