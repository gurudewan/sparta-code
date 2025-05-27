import { BACKEND_URL } from '../consts';

export async function getTrades(page = 1, size = 10) {
  const res = await fetch(`${BACKEND_URL}/trades?page=${page}&size=${size}`);
  if (!res.ok) throw new Error('Error fetching trades');
  return res.json();
}

export async function postTrade(data) {
  const res = await fetch(`${BACKEND_URL}/trades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error posting trade');
  return res.json();
}

export async function deleteTrades() {
  const res = await fetch(`${BACKEND_URL}/trades`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error deleting trades');
}

export async function getInsights() {
  const res = await fetch(`${BACKEND_URL}/insights`);
  if (!res.ok) throw new Error('Error fetching insights');
  return res.json();
}

export async function getAiInsights(question) {
  const res = await fetch(
    `${BACKEND_URL}/ai-insights?question=${encodeURIComponent(question)}`
  );
  if (!res.ok) throw new Error('Error fetching AI insights');
  return res.text();
}