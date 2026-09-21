export const DNS_AID_ZONE = 'double-slash.dev';
export const DNS_AID_TTL = 3600;
export const DNS_AID_TARGET = 'double-slash.dev.';
export const DNS_AID_PARAMS = 'alpn="h2,http/1.1" port=443';

export type DnsAidRecord = {
  owner: string;
  type: 'SVCB' | 'HTTPS';
  priority: number;
  target: string;
  params: string;
};

/**
 * ServiceMode DNS-AID records (draft-mozleywilliams-dnsop-dnsaid).
 * `_index` is the org entrypoint; `_a2a` matches the scanner's other probe.
 * alpn lists protocols the origin actually speaks — not a fake a2a/mcp server.
 */
export const dnsAidRecords: DnsAidRecord[] = [
  {
    owner: '_index._agents',
    type: 'SVCB',
    priority: 1,
    target: DNS_AID_TARGET,
    params: DNS_AID_PARAMS,
  },
  {
    owner: '_a2a._agents',
    type: 'SVCB',
    priority: 1,
    target: DNS_AID_TARGET,
    params: DNS_AID_PARAMS,
  },
];

/**
 * One BIND zone-file line for a DNS-AID ServiceMode record.
 */
export function formatDnsAidZoneLine(record: DnsAidRecord): string {
  return `${record.owner}.${DNS_AID_ZONE}. ${DNS_AID_TTL} IN ${record.type} ${record.priority} ${record.target} ${record.params}`;
}

/**
 * BIND snippet to paste into the OVH zone (text mode).
 */
export function buildDnsAidZoneFile(
  records: DnsAidRecord[] = dnsAidRecords,
): string {
  return records.map(formatDnsAidZoneLine).join('\n') + '\n';
}
