import React from 'react';
import { Badge } from 'react-bootstrap';

const JobTypeBadge = ({ type }) => {
  const getBadgeVariant = () => {
    switch (type) {
      case 'Full-time':
        return 'primary';
      case 'Part-time':
        return 'success';
      case 'Contract':
        return 'info';
      case 'Internship':
        return 'warning';
      default:
        return 'secondary';
    }
  };
  
  return (
    <Badge bg={getBadgeVariant()} className="py-2 px-3">
      {type}
    </Badge>
  );
};

export default JobTypeBadge;