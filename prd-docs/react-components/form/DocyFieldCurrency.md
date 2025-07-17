# DocyFieldCurrency Component

## Overview
DocyFieldCurrency is a specialized currency selection component that extends DocyFieldBase to provide comprehensive currency selection functionality. Built on top of shadcn/ui Select component, it offers advanced features including currency flags, exchange rates, intelligent search, grouping by regions, and real-time currency data. The component integrates seamlessly with multi-currency applications and provides extensive customization options for international financial workflows.

This component serves as the foundation for currency selection interfaces in global applications, supporting both simple currency lists and complex multi-currency scenarios with live exchange rates and regional grouping.

## Component Specification

### Props
DocyFieldCurrency inherits ALL props from DocyFieldBase and adds the following currency-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | string | - | No | Selected currency code (ISO 4217 format) |
| `currencies` | CurrencyOption[] | defaultCurrencies | No | Array of available currencies |
| `showFlag` | boolean | true | No | Display currency flag icons |
| `flagSize` | 'xs' \| 'sm' \| 'md' \| 'lg' | 'sm' | No | Size of currency flag icons |
| `showCode` | boolean | true | No | Display currency code (USD, EUR, etc.) |
| `showSymbol` | boolean | true | No | Display currency symbol ($, €, etc.) |
| `showName` | boolean | true | No | Display currency full name |
| `searchable` | boolean | true | No | Enable currency search functionality |
| `searchFields` | string[] | ['code', 'name', 'symbol'] | No | Fields to search across |
| `groupBy` | 'region' \| 'continent' \| 'popularity' \| 'alphabetical' | 'region' | No | Group currencies by specified criteria |
| `popular` | string[] | ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'] | No | List of popular currency codes |
| `showPopular` | boolean | true | No | Show popular currencies section |
| `showRates` | boolean | false | No | Display exchange rates |
| `baseCurrency` | string | 'USD' | No | Base currency for exchange rate calculations |
| `rateProvider` | 'fixer' \| 'exchangerate' \| 'custom' | 'fixer' | No | Exchange rate data provider |
| `onRateUpdate` | (rates: ExchangeRates) => void | - | No | Callback when exchange rates update |
| `format` | 'code' \| 'symbol' \| 'name' \| 'code-name' \| 'symbol-name' \| 'custom' | 'code-name' | No | Display format for selected currency |
| `locale` | string | 'en-US' | No | Locale for currency formatting |
| `allowAll` | boolean | false | No | Allow "All currencies" selection option |
| `onCurrencyChange` | (currency: CurrencyOption) => void | - | No | Callback when currency selection changes |
| `customFormatter` | (currency: CurrencyOption) => ReactNode | - | No | Custom currency display formatter |
| `rateUpdateInterval` | number | 300000 | No | Rate update interval in milliseconds (5 minutes default) |
| `showRateTimestamp` | boolean | true | No | Show when rates were last updated |
| `excludeCurrencies` | string[] | [] | No | Currency codes to exclude from selection |
| `onlyActiveCurrencies` | boolean | true | No | Show only currently active currencies |
| `sortBy` | 'code' \| 'name' \| 'popularity' \| 'rate' | 'code' | No | Sort order for currency options |
| `rateDecimalPlaces` | number | 4 | No | Decimal places for exchange rate display |
| `enableFavorites` | boolean | false | No | Allow users to mark favorite currencies |
| `favorites` | string[] | [] | No | Array of favorite currency codes |
| `onFavoritesChange` | (favorites: string[]) => void | - | No | Callback when favorites change |

**Note**: DocyFieldCurrency inherits all DocyFieldBase props including validation, layout, dynamic computed properties, actions system, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface CurrencyOption {
  code: string; // ISO 4217 currency code
  name: string; // Full currency name
  symbol: string; // Currency symbol
  flag: string; // Country flag icon or emoji
  region: string; // Geographic region
  continent: string; // Continent name
  countries: string[]; // Countries using this currency
  decimals: number; // Number of decimal places
  active: boolean; // Whether currency is currently active
  popularity: number; // Popularity ranking (1-100)
  rate?: number; // Exchange rate relative to base currency
  rateChange?: number; // Rate change percentage
  lastUpdated?: Date; // When rate was last updated
}

interface ExchangeRates {
  base: string; // Base currency code
  rates: Record<string, number>; // Currency code to rate mapping
  timestamp: Date; // When rates were fetched
  provider: string; // Rate provider name
}

interface CurrencyGroup {
  label: string; // Group display name
  currencies: CurrencyOption[]; // Currencies in this group
  collapsed?: boolean; // Whether group is collapsed
}

interface CurrencySearchConfig {
  searchFields: string[]; // Fields to search ('code', 'name', 'symbol', 'countries')
  caseSensitive: boolean; // Case-sensitive search
  fuzzySearch: boolean; // Enable fuzzy matching
  minSearchLength: number; // Minimum search length
  highlightMatches: boolean; // Highlight search matches
}

interface CurrencyRateConfig {
  provider: 'fixer' | 'exchangerate' | 'custom';
  apiKey?: string; // API key for rate provider
  updateInterval: number; // Update interval in milliseconds
  baseCurrency: string; // Base currency for calculations
  fallbackRates?: Record<string, number>; // Fallback rates if API fails
  onError?: (error: Error) => void; // Error handling callback
}

interface CurrencyDisplayConfig {
  format: 'code' | 'symbol' | 'name' | 'code-name' | 'symbol-name' | 'custom';
  showFlag: boolean;
  flagSize: 'xs' | 'sm' | 'md' | 'lg';
  showCode: boolean;
  showSymbol: boolean;
  showName: boolean;
  showRate: boolean;
  showRateChange: boolean;
  customFormatter?: (currency: CurrencyOption) => ReactNode;
}

interface CurrencyGroupConfig {
  groupBy: 'region' | 'continent' | 'popularity' | 'alphabetical';
  showPopular: boolean;
  popularCurrencies: string[];
  collapsibleGroups: boolean;
  groupSortOrder: 'asc' | 'desc';
}
```

### Behavior

1. **Currency Selection**:
   - Single currency selection with intelligent search
   - Support for all ISO 4217 currency codes
   - Real-time filtering and sorting capabilities
   - Keyboard navigation with currency code shortcuts

2. **Exchange Rate Integration**:
   - Live exchange rate fetching from multiple providers
   - Automatic rate updates with configurable intervals
   - Rate change indicators and trending information
   - Fallback mechanisms for offline scenarios

3. **Intelligent Grouping**:
   - Regional grouping (Americas, Europe, Asia-Pacific, etc.)
   - Continent-based organization
   - Popularity-based sorting with trending currencies
   - Alphabetical organization with quick navigation

4. **Advanced Search**:
   - Multi-field search across code, name, symbol, and countries
   - Fuzzy search for typo tolerance
   - Search result highlighting
   - Quick access to popular currencies

5. **Customization Features**:
   - Flexible display formats (code, symbol, name combinations)
   - Custom currency formatting with locale support
   - Themeable flag icons and visual elements
   - Extensible with custom rate providers

6. **User Experience**:
   - Favorites system for frequently used currencies
   - Recent selections tracking
   - Responsive design for all device sizes
   - Accessibility with screen reader support

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Select component (`pnpm dlx shadcn@latest add select`)
- **Extensions**: Docy-specific features including currency flags, exchange rates, regional grouping, and advanced search built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Select component with Tailwind CSS v4
- **Internationalization**: Support for multiple locales and currency formatting
- **Exchange Rates**: Integration with external rate providers (Fixer.io, ExchangeRate-API)
- **Accessibility**: WCAG 2.1 AA compliance with full keyboard navigation

### Key Features Required
1. **Currency Database**: Comprehensive ISO 4217 currency database with metadata
2. **Exchange Rate Integration**: Real-time rate fetching with multiple provider support
3. **Regional Grouping**: Intelligent grouping by geography and popularity
4. **Flag Icons**: High-quality currency flag icons with multiple sizes
5. **Search System**: Advanced search with fuzzy matching and multi-field support
6. **Favorites**: User-customizable favorite currencies system
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic currency selection
<DocyFieldCurrency
  name="currency"
  label="Currency"
  placeholder="Select currency"
  required={true}
  validations={[
    { type: 'required', message: 'Currency is required' }
  ]}
/>

// Currency with exchange rates
<DocyFieldCurrency
  name="baseCurrency"
  label="Base Currency"
  showRates={true}
  baseCurrency="USD"
  rateProvider="fixer"
  rateUpdateInterval={300000}
  showRateTimestamp={true}
  onRateUpdate={(rates) => {
    console.log('Exchange rates updated:', rates);
  }}
  format="code-name"
  rateDecimalPlaces={4}
/>

// Popular currencies with custom grouping
<DocyFieldCurrency
  name="tradingCurrency"
  label="Trading Currency"
  showPopular={true}
  popular={['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY']}
  groupBy="popularity"
  searchable={true}
  searchFields={['code', 'name', 'symbol']}
  showFlag={true}
  flagSize="md"
  showSymbol={true}
  showRates={true}
  onCurrencyChange={(currency) => {
    console.log('Selected currency:', currency);
  }}
/>

// Multi-currency application with favorites
<DocyFieldCurrency
  name="preferredCurrency"
  label="Preferred Currency"
  enableFavorites={true}
  favorites={['USD', 'EUR', 'GBP']}
  onFavoritesChange={(favorites) => {
    localStorage.setItem('favoriteCurrencies', JSON.stringify(favorites));
  }}
  groupBy="region"
  showFlag={true}
  showCode={true}
  showName={true}
  format="symbol-name"
  locale="en-US"
  sortBy="popularity"
/>

// Custom currency formatter
<DocyFieldCurrency
  name="displayCurrency"
  label="Display Currency"
  format="custom"
  customFormatter={(currency) => (
    <div className="flex items-center gap-2">
      <img 
        src={`/flags/${currency.code.toLowerCase()}.svg`} 
        alt={currency.name}
        className="w-6 h-4 object-cover rounded"
      />
      <div className="flex flex-col">
        <span className="font-medium">{currency.code}</span>
        <span className="text-sm text-gray-500">{currency.name}</span>
      </div>
      {currency.rate && (
        <div className="ml-auto text-sm">
          {currency.rate.toFixed(4)}
          {currency.rateChange && (
            <span className={`ml-1 ${currency.rateChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
              ({currency.rateChange > 0 ? '+' : ''}{currency.rateChange.toFixed(2)}%)
            </span>
          )}
        </div>
      )}
    </div>
  )}
  showRates={true}
  rateProvider="custom"
/>

// Regional grouping with all features
<DocyFieldCurrency
  name="internationalCurrency"
  label="International Currency"
  groupBy="region"
  showPopular={true}
  popular={['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'KRW', 'SGD']}
  searchable={true}
  searchFields={['code', 'name', 'symbol', 'countries']}
  showFlag={true}
  flagSize="sm"
  showCode={true}
  showSymbol={true}
  showName={true}
  showRates={true}
  showRateTimestamp={true}
  baseCurrency="USD"
  rateProvider="fixer"
  rateUpdateInterval={300000}
  format="code-name"
  locale="en-US"
  onlyActiveCurrencies={true}
  sortBy="popularity"
  enableFavorites={true}
/>

// All currencies option for reporting
<DocyFieldCurrency
  name="reportingCurrency"
  label="Reporting Currency"
  allowAll={true}
  showPopular={true}
  groupBy="popularity"
  searchable={true}
  showFlag={true}
  showCode={true}
  showName={false}
  format="code"
  validations={[
    { type: 'required', message: 'Reporting currency is required' }
  ]}
  computedRequired={{
    field: 'reportType',
    operator: 'equals',
    value: 'financial'
  }}
/>

// Form integration with actions
<DocyFieldCurrency
  name="transactionCurrency"
  label="Transaction Currency"
  showRates={true}
  baseCurrency="USD"
  actions={{
    change: [
      ['setFieldValueCalculated', {
        field: 'exchangeRate',
        formula: 'currencies[code=$].rate'
      }],
      ['setFieldValueCalculated', {
        field: 'convertedAmount',
        formula: 'amount * exchangeRate'
      }],
      ['condition', 'transactionCurrency != "USD"', [
        ['setFieldOption', {
          field: 'showConversion',
          option: 'hidden',
          value: false
        }]
      ]]
    ]
  }}
  validations={[
    { type: 'required', message: 'Transaction currency is required' }
  ]}
  customValidations={[
    {
      formula: 'userRole = "trader" and $not($contains(["USD", "EUR", "GBP"], transactionCurrency))',
      message: 'Traders can only use major currencies'
    }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For currency flags and UI elements
- **DocyBadge**: For rate change indicators
- **DocyTooltip**: For currency information tooltips
- **DocyButton**: For favorites and group actions
- **DocySpinner**: For loading states during rate fetching
- **Exchange Rate API**: Integration with rate providers
- **Currency Database**: ISO 4217 currency metadata

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-select`: Base select component (via shadcn/ui)
- `fuse.js`: Fuzzy search functionality
- `use-debounce`: Search input debouncing
- `axios` or `fetch`: HTTP client for exchange rate APIs
- `date-fns`: Date formatting for rate timestamps
- `class-variance-authority`: Variant management
- `react-window`: Virtual scrolling for large currency lists
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Currency selection, exchange rate fetching, search functionality, grouping logic
2. **Integration Tests**: React Hook Form integration, validation, actions system, rate provider APIs
3. **Visual Tests**: All display formats, flag rendering, rate indicators, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large currency lists, rate update intervals, search performance
6. **API Tests**: Exchange rate provider integration, error handling, fallback mechanisms
7. **Internationalization Tests**: Multiple locales, currency formatting, regional grouping

## Development Priority
**Medium** - Specialized component for international applications and financial workflows

## Notes
- Built on shadcn/ui Select component for consistent design system integration
- Comprehensive ISO 4217 currency database with rich metadata
- Real-time exchange rate integration with multiple provider support
- Intelligent grouping and search capabilities for enhanced user experience
- Complete accessibility compliance ensures inclusive user experience
- Extensible architecture supports custom rate providers and formatters
- Optimized for performance with virtual scrolling and efficient rate caching
- Integration with existing form systems and validation frameworks
- Responsive design adapts to all device sizes and orientations
- Supports both simple currency selection and complex multi-currency scenarios