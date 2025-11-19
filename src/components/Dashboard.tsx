import React from 'react';
import { Users } from 'lucide-react';

const Dashboard: React.FC = () => {

  const getDashboardStats = () => {

    const allUsers = [
      { role: 'admin', status: 'active' },
      { role: 'worker', status: 'active' },
      { role: 'worker', status: 'inactive' },
      { role: 'family', status: 'active' },
      { role: 'family', status: 'inactive' }
    ];

    return {
      totalUsers: allUsers.length,
      workers: allUsers.filter(u => u.role === 'worker').length,
      families: allUsers.filter(u => u.role === 'family').length,
      activeUsers: allUsers.filter(u => u.status === 'active').length
    };
  };

  const stats = getDashboardStats();

  const statCards = [
    {
      title: 'Total Usuarios',
      value: stats.totalUsers,
      icon: Users,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Cuidadores',
      value: stats.workers,
      icon: Users,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Familias',
      value: stats.families,
      icon: Users,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Usuarios Activos',
      value: stats.activeUsers,
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

