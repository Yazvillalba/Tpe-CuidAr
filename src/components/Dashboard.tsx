import React from 'react';
import { Users } from 'lucide-react';
import { useUsers } from '../contexts/UsersContext';

const Dashboard: React.FC = () => {
  const { dashboardStats, loading } = useUsers();

  const stats = dashboardStats;

  if (loading) {
    return (
      <div className="row g-4">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="glass rounded-2xl p-4 shadow-lg">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="small fw-medium text-gray-600 mb-1">Cargando...</h3>
                  <p className="h2 fw-bold text-gray-900 mb-0">-</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-xl">
                  <Users className="text-gray-400" style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Usuarios',
      value: stats.totalUsers || 0,
      icon: Users,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Cuidadores',
      value: stats.workers || 0,
      icon: Users,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Familias',
      value: stats.families || 0,
      icon: Users,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Usuarios Activos',
      value: stats.activeUsers || 0,
      icon: Users,
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    }
  ];

  return (
    <div className="row g-4">
      {statCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="glass rounded-2xl p-4 shadow-lg">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="small fw-medium text-gray-600 mb-1">{card.title}</h3>
                  <p className="h2 fw-bold text-gray-900 mb-0">{card.value}</p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-xl`}>
                  <IconComponent className={card.iconColor} style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;

