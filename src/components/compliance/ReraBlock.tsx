import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';
import { COMPLIANCE } from '@/config/compliance';
import { COMPANY } from '@/config/company';
import { ProjectConfig } from '@/config/projects';

interface ReraBlockProps {
  project: ProjectConfig;
  className?: string;
}

export function ReraBlock({ project, className = '' }: ReraBlockProps) {
  const isDev = process.env.NODE_ENV !== 'production';
  const hasReraNumber = project.approvals.rera.verified && project.approvals.rera.number;
  const hasDtcpNumber = project.approvals.dtcp.verified && project.approvals.dtcp.number;

  return (
    <aside
      aria-label="Statutory Regulatory Compliance Details"
      className={`p-4 sm:p-5 rounded-2xl bg-paper border border-stone text-left text-xs ${className}`}
    >
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-stone">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-success flex-shrink-0" />
          <span className="font-serif font-medium text-ink text-sm">Regulatory Approvals</span>
        </div>
        <Link
          href={COMPLIANCE.authorityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-sans text-muted hover:text-ink flex items-center gap-1 transition-colors"
        >
          <span>TNRERA Portal</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="pt-3 space-y-2 font-sans text-muted">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] uppercase tracking-wider">TNRERA No:</span>
          {hasReraNumber ? (
            <strong className="text-ink font-semibold">{project.approvals.rera.number}</strong>
          ) : (
            <span className="text-ink font-medium">Registration details being updated — contact us</span>
          )}
        </div>

        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] uppercase tracking-wider">DTCP Sanction:</span>
          {hasDtcpNumber ? (
            <strong className="text-ink font-semibold">{project.approvals.dtcp.number}</strong>
          ) : (
            <span className="text-muted">Approval under verification</span>
          )}
        </div>

        <div className="flex items-start justify-between gap-2 pt-1 border-t border-stone/50 text-[11px]">
          <span>Developer:</span>
          <span className="text-ink font-medium">{COMPANY.name}</span>
        </div>

        <div className="flex items-start justify-between gap-2 text-[11px]">
          <span>Location:</span>
          <span className="text-ink font-medium">{project.area}</span>
        </div>

        {/* QR Code if verified and provided */}
        {project.approvals.rera.qrImage && (
          <div className="pt-2 flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-stone">
              <Image
                src={project.approvals.rera.qrImage}
                alt={`${project.name} RERA Form-C QR Code`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <span className="text-[10px] text-muted leading-tight">
              Scan to view official Form-C verification filing on TNRERA.
            </span>
          </div>
        )}

        {/* Dev-only warning banner when unverified */}
        {isDev && (!hasReraNumber || !hasDtcpNumber) && (
          <div className="mt-3 p-2.5 rounded-lg bg-accent-light/50 border border-accent/30 text-[11px] text-ink flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
            <span>
              <strong>Dev Warning:</strong> Regulatory approval numbers are pending client verification in <code>src/config/projects.ts</code>.
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}

export default ReraBlock;
