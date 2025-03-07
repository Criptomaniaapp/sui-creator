interface TokenPreviewProps {
    tokenName: string;
    tokenSymbol: string;
    logoUrl: string;
    supply: string;
    decimals: string;
    creatorName: string;
    creatorSite: string;
    freezeAuthority: boolean;
    mintAuthority: boolean;
    updateAuthority: boolean;
  }
  
  export default function TokenPreview({
    tokenName,
    tokenSymbol,
    logoUrl,
    supply,
    decimals,
    creatorName,
    creatorSite,
    freezeAuthority,
    mintAuthority,
    updateAuthority,
  }: TokenPreviewProps) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
        <div className="flex items-center gap-4">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt="Token Logo"
              className="h-16 w-16 object-contain rounded-full border border-gray-600"
            />
          ) : (
            <div className="h-16 w-16 flex items-center justify-center bg-gray-700 text-gray-400 rounded-full">
              Logo
            </div>
          )}
          <div className="text-left">
            <h3 className="text-2xl font-semibold">{tokenName || 'Token Name'}</h3>
            <p className="text-lg text-gray-400">{tokenSymbol || 'Symbol'}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Supply:</span>
            <span>{supply || 'N/A'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Decimals:</span>
            <span>{decimals || 'N/A'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Creator:</span>
            <span>{creatorName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Creator Site:</span>
            <a
              href={creatorSite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {creatorSite}
            </a>
          </div>
          <div className="flex justify-between text-sm">
            <span>Revoke Freeze Authority:</span>
            <span>{freezeAuthority ? 'Revoked' : 'Active'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Revoke Mint Authority:</span>
            <span>{mintAuthority ? 'Revoked' : 'Active'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Revoke Metadata Update Authority:</span>
            <span>{updateAuthority ? 'Revoked' : 'Active'}</span>
          </div>
        </div>
      </div>
    );
  }
  