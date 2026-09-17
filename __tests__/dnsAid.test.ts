import fs from 'fs';
import path from 'path';
import {describe, expect, test} from 'vitest';
import {
  DNS_AID_PARAMS,
  DNS_AID_TARGET,
  dnsAidRecords,
  formatDnsAidZoneLine,
} from '../app/utils/dnsAid';

const ZONE_PATH = path.join(process.cwd(), 'dns/dns-aid.zone');

const zoneLines = fs
  .readFileSync(ZONE_PATH, 'utf8')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line && !line.startsWith(';'));

describe('DNS-AID zone snippet', () => {
  test('publishes ServiceMode SVCB records with alpn and port', () => {
    expect(dnsAidRecords.length).toBeGreaterThan(0);

    for (const record of dnsAidRecords) {
      expect(record.priority).toBeGreaterThanOrEqual(1);
      expect(record.target.endsWith('.')).toBe(true);
      expect(record.target).not.toMatch(/_/);
      expect(record.params).toContain('alpn=');
      expect(record.params).toContain('port=443');
      expect(zoneLines).toContain(formatDnsAidZoneLine(record));
    }
  });

  test('includes the well-known _index and _a2a entrypoints', () => {
    const owners = dnsAidRecords.map(record => record.owner);

    expect(owners).toContain('_index._agents');
    expect(owners).toContain('_a2a._agents');
    expect(DNS_AID_TARGET).toBe('double-slash.dev.');
    expect(DNS_AID_PARAMS).toBe('alpn="h2,http/1.1" port=443');
  });
});
