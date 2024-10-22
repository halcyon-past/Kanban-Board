import React from 'react';
import Ticket from './Ticket';
import Backlog from '../assets/Backlog.svg';
import ToDo from '../assets/To-Do.svg';
import InProgress from '../assets/In-Progress.svg';
import Done from '../assets/Done.svg';
import Cancelled from '../assets/Cancelled.svg';
import UrgentPriority from '../assets/SVG - Urgent Priority grey.svg';
import HighPriority from '../assets/Img - High Priority.svg';
import MediumPriority from '../assets/Img - Medium Priority.svg';
import LowPriority from '../assets/Img - Low Priority.svg';
import NoPriority from '../assets/No-priority.svg';
import add from '../assets/add.svg';
import ThreeDotMenu from '../assets/3 dot menu.svg';

const groupTickets = (tickets, users, groupBy) => {
  const grouped = {};

  if (groupBy === 'priority') {
    grouped[4] = [];
    grouped[3] = [];
    grouped[2] = [];
    grouped[1] = [];
    grouped[0] = [];
    tickets.forEach(ticket => {
      grouped[ticket.priority].push(ticket);
    });
  } else if (groupBy === 'status') {
    const statuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
    statuses.forEach(status => {
      grouped[status] = [];
    });
    tickets.forEach(ticket => {
      grouped[ticket.status].push(ticket);
    });
  } else if (groupBy === 'user') {
    tickets.forEach(ticket => {
      const userName = users.find(u => u.id === ticket.userId)?.name || 'Unknown';
      if (!grouped[userName]) grouped[userName] = [];
      grouped[userName].push(ticket);
    });
  }

  return grouped;
};

const getRandomColor = () => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33B8', '#FF8A33', '#33FFFC'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getInitials = (name) => {
  if (!name) return '';
  const nameParts = name.trim().split(' ');
  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase();
  } else {
    return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
  }
};

const sortTickets = (tickets, sortBy) => {
  if (sortBy === 'priority') {
    return tickets.sort((a, b) => b.priority - a.priority);
  } else if (sortBy === 'title') {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  }
  return tickets;
};

const Board = ({ tickets, users, groupBy, sortBy }) => {
  const groupedTickets = groupTickets(tickets, users, groupBy);
  const bgColor = getRandomColor();

  const statusImages = {
    'Backlog': Backlog,
    'Todo': ToDo,
    'In progress': InProgress,
    'Done': Done,
    'Cancelled': Cancelled
  }

  const priorityImages = {
    'Urgent': UrgentPriority,  
    'High': HighPriority,
    'Medium': MediumPriority,
    'Low': LowPriority,
    'No Priority': NoPriority
  };
  
  const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, group) => {
    acc[group] = sortTickets(groupedTickets[group], sortBy);
    return acc;
  }, {});

  const priorityHeaders = ['Urgent', 'High', 'Medium', 'Low', 'No Priority'];
  const statusHeaders = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];

  const renderColumns = () => {
    if (groupBy === 'priority') {
      return priorityHeaders.map((header, idx) => (
        <div key={header} className="column">
          <div className="head">
            <div className="left">
              <img src={priorityImages[header]} alt={header}/>
              <p><b>{header}</b></p>
              <p>{sortedGroupedTickets[idx]?.length || 0}</p>
            </div>
            <div className="right">
              <img src={add} alt="Add"/>
              <img src={ThreeDotMenu} alt="Menu"/>
            </div>
          </div>
          {sortedGroupedTickets[idx]?.map(ticket => (
            <Ticket key={ticket.id} ticket={ticket} users={users} />
          )) || <p>No tickets</p>}
        </div>
      ));
    } else if (groupBy === 'status') {
      return statusHeaders.map((header) => (
        <div key={header} className="column">
          <div className="head">
            <div className="left">
              <img src={statusImages[header]} alt={header}/>
              <p><b>{header}</b></p>
              <p>{sortedGroupedTickets[header]?.length || 0}</p>
            </div>
            <div className="right">
              <img src={add} alt="Add"/>
              <img src={ThreeDotMenu} alt="Menu"/>
            </div>
          </div>
          {sortedGroupedTickets[header]?.map(ticket => (
            <Ticket key={ticket.id} ticket={ticket} users={users} />
          )) || <p>No tickets</p>}
        </div>
      ));
    } else {
      return Object.keys(sortedGroupedTickets).map(group => {
        const userInitials = getInitials(group);
        const bgColor = getRandomColor();
    
        return (
          <div key={group} className="column">
            <div className="head">
              <div className="left">
                <div 
                  className="profile" 
                  style={{
                    backgroundColor: bgColor, 
                  }}
                >
                  {userInitials}
                </div>
                <p><b>{group}</b></p>
                <p>{sortedGroupedTickets[group]?.length || 0}</p>
              </div>
              <div className="right">
                <img src={add} alt="Add"/>
                <img src={ThreeDotMenu} alt="Menu"/>
              </div>
            </div>
            {sortedGroupedTickets[group].map(ticket => (
              <Ticket key={ticket.id} ticket={ticket} users={users} noImg={true}/>
            )) || <p>No tickets</p>}
          </div>
        );
      });
    }
  };

  return (
    <div className="board">
      {renderColumns()}
    </div>
  );
};

export default Board;
