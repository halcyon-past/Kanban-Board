import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Header from './components/Header';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div>
      {loading ? (
        <div class="loader">
          <div class="spinner"></div>
        </div>
      ) : (
        <>
          <Header
            setGroupBy={setGroupBy}
            setSortBy={setSortBy}
            groupBy={groupBy}
            sortBy={sortBy}
          />
          <Board tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
        </>
      )}
    </div>
  );
};

export default App;
