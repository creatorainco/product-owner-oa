import React, { useState, useMemo, useEffect } from "react";
import Pagination from "./Pagination";
import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import FilterBar from "./FilterBar";
import { Button } from "@/components/ui/button";

interface Influencer {
  id: number;
  name: string;
  username: string;
  email: string;
  bio: string;
  city: string;
  state: string;
  most_viral_video_desc: string;
  hashtags: string[];
  followers: number;
  platforms: string[];
  averageViews: number;
}

interface InfluencerTableProps {
  data: Influencer[];
  loading: boolean;
  error: string | null;
  initialFetchCount: number;
  onRefresh: (newCount: number) => void;
}

const InfluencerTable: React.FC<InfluencerTableProps> = ({ data, loading, error, initialFetchCount, onRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;

  const [fetchCount, setFetchCount] = useState<number>(initialFetchCount);

  useEffect(() => {
    setFetchCount(initialFetchCount);
  }, [initialFetchCount]);

  const handleFetchCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCount = parseInt(e.target.value, 10);
    setFetchCount(newCount);
    onRefresh(newCount);
  };

  const handleExportCSV = () => {
    if (data.length === 0) {
      alert("No data to export.");
      return;
    }
    const headers = [ "Name", "Username", "Followers", "Average Views", "Email", "Platforms", "Hashtags", "City", "State", "Bio", "Most Viral Video Description" ];
    const escapeCsvField = (field: any): string => {
        if (field == null) return "";
        const str = String(field);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };
    const csvRows = [
        headers.join(','),
        ...data.map(i => [
            escapeCsvField(i.name), escapeCsvField(i.username), i.followers, i.averageViews, escapeCsvField(i.email),
            escapeCsvField(i.platforms.join('; ')), escapeCsvField(i.hashtags.join('; ')),
            escapeCsvField(i.city), escapeCsvField(i.state), escapeCsvField(i.bio), escapeCsvField(i.most_viral_video_desc),
        ].join(','))
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'influencers_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const [minFollowers, setMinFollowers] = useState(0);
  const [maxFollowers, setMaxFollowers] = useState(300000);
  
  React.useEffect(() => {
    if (data.length > 0) {
      setMinFollowers(0);
      setMaxFollowers(300000);
    }
  }, [data]);

  const filteredData = useMemo(() => {
    return data
      .filter((influencer) => {
        if (maxFollowers >= 300000) {
          return influencer.followers >= minFollowers;
        }
        return influencer.followers >= minFollowers && influencer.followers <= maxFollowers;
      })
      .sort((a, b) => b.followers - a.followers);
  }, [data, minFollowers, maxFollowers]);

  const handleFilterChange = (min: number, max: number) => {
    setMinFollowers(min);
    setMaxFollowers(max);
    setCurrentPage(1);
  };

  const currentData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, currentPage]);

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    if (count >= 1000) return (count / 1000).toFixed(1) + "K";
    return count.toString();
  };

  const renderPlatformIcons = (platforms: string[], username: string) => {
    return platforms.map((platform, index) => {
      switch (platform.trim()) {
        case "TikTok": return <a key={index} href={`https://www.tiktok.com/@${username}`} target="_blank" rel="noopener noreferrer"><FaTiktok className="text-blue-700 mx-1 text-lg md:text-lg" /></a>;
        case "Instagram": return <a key={index} href={`https://www.google.com/search?q=${username}+instagram`} target="_blank" rel="noopener noreferrer"><FaInstagram className="text-blue-700 mx-1 text-lg md:text-xl" /></a>;
        case "YouTube": return <a key={index} href={`https://www.google.com/search?q=${username}+youtube`} target="_blank" rel="noopener noreferrer"><FaYoutube className="text-blue-700 mx-1 text-lg md:text-2xl mr-1" /></a>;
        default: return null;
      }
    });
  };

  return (
    <div className="overflow-x-auto shadow-sm ml-4 mr-4">
      {loading ? (
        <div className="flex justify-center items-center h-[500px]">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex justify-end items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                  <label htmlFor="fetch-count-select" className="text-sm font-medium text-gray-800 whitespace-nowrap">
                    Fetch Count:
                  </label>
                  <select
                    id="fetch-count-select"
                    value={fetchCount}
                    onChange={handleFetchCountChange}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  >
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                    <option value="5000">5000</option>
                  </select>
              </div>
              <Button onClick={handleExportCSV} disabled={loading || data.length === 0}>
                Export CSV
              </Button>
          </div>
          
          <FilterBar
            minFollowers={0}
            maxFollowers={300000}
            onFilterChange={handleFilterChange}
          />
          
          <table className="min-w-full text-gray-700 mt-4">
            <thead>
              <tr className="h-14 text-[#2E354F]">
                <th className="p-2 font-semibold text-sm md:text-base lg:text-xl text-left">Influencer</th>
                <th className="p-2 font-semibold text-sm md:text-base lg:text-xl">Followers</th>
                <th className="p-2 font-semibold text-sm md:text-base lg:text-xl">Platforms</th>
                <th className="p-2 font-semibold text-sm md:text-base lg:text-xl">Average Views</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="text-center border-t border-gray-200">
                  <td className="p-2 flex justify-start">
                    <div className="flex items-center space-x-3 w-full sm:w-40 md:w-48 lg:w-60 truncate justify-start">
                      <a href={`https://www.tiktok.com/@${item.username}`} target="_blank" rel="noopener noreferrer" className="truncate text-[#2E354F] font-semibold text-sm md:text-base lg:text-lg hover:underline">
                        {item.name === "0" || item.name === '0' ? item.username : item.name}
                      </a>
                    </div>
                  </td>
                  <td className="p-2 text-sm md:text-base lg:text-lg">{formatFollowers(item.followers)}</td>
                  <td className="p-2"><div className="flex items-center justify-center">{renderPlatformIcons(item.platforms, item.username)}</div></td>
                  <td className="p-2 text-sm md:text-base lg:text-lg">{item.averageViews.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {currentPage === Math.ceil(filteredData.length / itemsPerPage) && (
            <div className="mt-3 mb-3 bg-yellow-50 border-l-4 border-yellow-400 p-3">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This preview shows the first 100 matched influencers. For full access to all matches, detailed analytics, and advanced filtering options, please upgrade to our premium plan.
              </p>
            </div>
          )}

          <Pagination itemsPerPage={itemsPerPage} totalItems={filteredData.length} paginate={(pageNumber) => setCurrentPage(pageNumber)} />
        </>
      )}
    </div>
  );
};

export default InfluencerTable;