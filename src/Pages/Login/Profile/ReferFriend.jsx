import React, { useState } from "react";
import { Share2, Copy, Check, Gift, Users, Sparkles } from "lucide-react";

const ReferralCode = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <Share2 className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Refer & Earn</h2>
          <p className="text-sm text-gray-500">Share code with friends</p>
        </div>
        <div className="w-full bg-gray-50 rounded p-2">
          <div className="flex items-center justify-between">
            <div className="font-mono text-base font-medium text-gray-900">{code}</div>
            <button onClick={handleCopy} className="text-gray-600 hover:text-gray-900">
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RewardCard = ({ reward }) => (
  <div className="bg-white rounded-lg border p-3">
    <div className="flex gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Gift className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="truncate">
            <h3 className="font-medium text-sm text-gray-900">{reward.title}</h3>
            <p className="text-xs text-gray-500 truncate">{reward.description}</p>
          </div>
          <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
            reward.status === 'Claimed' 
              ? 'bg-green-50 text-green-700' 
              : reward.status === 'Pending' 
              ? 'bg-yellow-50 text-yellow-700'
              : 'bg-gray-50 text-gray-700'
          }`}>
            {reward.status}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-gray-500 truncate">Referred: {reward.friendName}</span>
          <span className="font-medium text-gray-900 ml-2">₹{reward.amount}</span>
        </div>
      </div>
    </div>
  </div>
);

const StatsCard = ({ icon: Icon, value, label }) => (
  <div className="bg-white rounded-lg border p-3">
    <div className="flex items-center gap-3">
      <Icon className="w-6 h-6 text-gray-600" />
      <div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  </div>
);

const ReferFriend = () => {
  const [referralCode] = useState("JOHN500");
  const [rewards] = useState([
    {
      id: 1,
      title: "First Purchase Bonus",
      description: "Reward for friend's first purchase",
      status: "Claimed",
      friendName: "Alice Smith",
      amount: 500,
    },
    {
      id: 2,
      title: "Referral Bonus",
      description: "Sign up bonus for referring Sarah",
      status: "Pending",
      friendName: "Sarah Johnson",
      amount: 250,
    }
  ]);

  const totalEarned = rewards.reduce((sum, reward) => 
    reward.status === 'Claimed' ? sum + reward.amount : sum, 0
  );

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 mb-16">
      <ReferralCode code={referralCode} />

      <div className="grid grid-cols-3 gap-2 my-4">
        <StatsCard icon={Users} value={rewards.length} label="Referrals" />
        <StatsCard icon={Gift} value={`₹${totalEarned}`} label="Earned" />
        <StatsCard icon={Sparkles} value="₹500" label="Per Referral" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">Recent Rewards</h3>
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>

      {rewards.length === 0 && (
        <div className="bg-white rounded-lg border p-4 text-center mt-4">
          <Gift className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-900">No Rewards Yet</h3>
          <p className="text-xs text-gray-500 mb-3">Start referring friends</p>
          <button className="inline-flex items-center gap-1 bg-gray-900 text-white px-4 py-1.5 rounded text-sm hover:bg-gray-800">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      )}
    </div>
  );
};

export default ReferFriend;