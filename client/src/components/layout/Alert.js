import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  useEffect(() => {
    if (alerts !== null && alerts.length > 0) {
      window.scrollTo(0, 0);
    }
  }, [alerts]);

  if (alerts !== null && alerts.length > 0)
    return alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));
};

export default Alert;