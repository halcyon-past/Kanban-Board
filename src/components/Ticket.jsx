import React from 'react';
import UrgentPriority from '../assets/SVG - Urgent Priority grey.svg';
import HighPriority from '../assets/Img - High Priority.svg';
import MediumPriority from '../assets/Img - Medium Priority.svg';
import LowPriority from '../assets/Img - Low Priority.svg';
import NoPriority from '../assets/No-priority.svg';
import Backlog from '../assets/Backlog.svg';
import InProgress from '../assets/in-progress.svg';
import Done from '../assets/Done.svg';
import ToDo from '../assets/To-do.svg';
import Cancelled from '../assets/Cancelled.svg';

const getInitials = (name) => {
  if (!name) return '';
  const nameParts = name.trim().split(' ');
  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase();
  } else {
    return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
  }
};

const getRandomColor = () => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33B8', '#FF8A33', '#33FFFC'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Ticket = ({ ticket, users, noImg }) => {
  const user = users.find(u => u.id === ticket.userId);
  const userInitials = user ? getInitials(user.name) : 'X';
  const bgColor = getRandomColor();

  const priorityImages = {
    4: UrgentPriority,  
    3: HighPriority,
    2: MediumPriority,
    1: LowPriority,
    0: NoPriority
  };

  const statusImages = {
    'Backlog': Backlog,
    'In progress': InProgress,
    'Todo': ToDo,
    'Done': Done,
    'Cancelled': Cancelled
  };

  const priorityImg = priorityImages[ticket.priority];

  return (
    <div className="ticket">
      <div className="head">
        <p>{ticket.id}</p>
        {
            noImg? (
                ""
            ):(
                <div 
          className="profile" 
          style={{
            backgroundColor: bgColor, 
          }}
        >
          {userInitials}
        </div>
            )
        }
      </div>
      <div className="task">
        <img src={statusImages[ticket.status]} alt={ticket.status} />
        <p>{ticket.title}</p>
      </div>
      <div className="status">
        <img src={priorityImg} alt={`Priority level ${ticket.priority}`} />
        <div className="tag">
          <div className="circle"></div>
          <p>{ticket.tag[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
