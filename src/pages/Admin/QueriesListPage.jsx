import React, { useState, useEffect } from 'react';
import { databases } from '../../services/AppwriteService';
import conf from '../../services/conf';

const styles = {
  tableClasses: 'min-w-full bg-white border-b p-4 ',
  cellClasses: 'py-3 px-4 border-b',
  buttonClasses: 'w-full bg-black hover:bg-gray-700 text-white px-4 py-1 rounded-md',
  OVERLAY_STYLES: 'fixed inset-0 bg-black/70 z-100'
}


const QueriesListPage = () => {
  const [queries, setQueries] = useState([]);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await databases.listDocuments(conf.appwriteDatabaseId, conf.QueriesCollectionId);
        setQueries(response.documents);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchQueries();
  }, []);

  const handleReplyClick = (query) => {
    setSelectedQuery(query);
    setIsReplyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsReplyModalOpen(false);
  };

  const handleSubmitReply = async (reply) => {
    // Implement logic to send reply to the selected query
    console.log('Reply:', reply);

    handleCloseModal();
  };

  return (
    <section className='w-full md:px-10'>
        <h1 className="text-2xl font-bold mb-4">User Queries</h1>
        <p className="text-muted-foreground mb-6">As an admin, you can view and reply to user queries from this panel.</p>
        <table className={styles.tableClasses}>
          <thead>
            <tr className="bg-zinc-100">
              <th className={`${styles.cellClasses} text-left`}>User Name</th>
              <th className={`${styles.cellClasses} text-left`}>User Email</th>
              <th className={`${styles.cellClasses} text-left`}>Query</th>
              <th className={`${styles.cellClasses} text-left`}>Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.$id} className={styles.rowHoverClasses}>
                <td className={styles.cellClasses}>{query.name}</td>
                <td className={styles.cellClasses}>{query.email}</td>
                <td className={styles.cellClasses}>{query.query}</td>
                <td className={styles.cellClasses}>
                  <button onClick={() => handleReplyClick(query)} className={styles.buttonClasses}>➤ Reply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Reply Modal */}
        {isReplyModalOpen && (
          <>
            <div className={styles.OVERLAY_STYLES} />
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 z-50">
                <h2 className="text-xl font-bold mb-4">Reply to Query</h2>
                <textarea
                  className="w-full border rounded-md p-2 resize-none"
                  placeholder="Enter your reply..."
                  defaultValue={selectedQuery?.reply} // Pre-fill reply if available
                />
                <div className="mt-4 flex justify-end">
                  <button onClick={handleCloseModal} className="border border-zinc-100 hover:bg-zinc-50 text-zinc font-semibold py-2 px-4 rounded-md mr-2">Cancel</button>
                  <button onClick={() => handleSubmitReply(selectedQuery?.reply)} className="bg-zinc-700 hover:bg-zinc-500 text-white font-semibold py-2 px-4 rounded-md">Send</button>
                </div>
              </div>
            </div>
          </>
        )}
    </section>
  );
};


export default QueriesListPage;