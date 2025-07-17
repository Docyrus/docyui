# DocyField Development Guide

## Overview
This guide provides the standard methodology for documenting form field components in the React migration project. All field components extend DocyFieldBase and follow consistent patterns for props, behavior, and implementation requirements.

## Documentation Structure

### 1. Component Header
```markdown
# DocyField[Type] Component

## Overview
[Brief description of the field type, its purpose, and key functionality]
```

### 2. Component Specification

#### Props Table Format
```markdown
### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `extends` | DocyFieldBase | - | Yes | Inherits all base field props |
| `fieldSpecificProp` | type | default | required | description |
```

#### TypeScript Interfaces
```typescript
interface FieldTypeProps extends DocyFieldBaseProps {
  // Field-specific props only
  fieldSpecificProp?: type;
}

interface FieldTypeState {
  // Field-specific state properties
}
```

### 3. Field-Specific Behavior Section
Document only behaviors unique to this field type:
- Input validation patterns
- Data transformation logic
- User interaction patterns
- Display formatting

### 4. Component Requirements
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui component (if available) extended with Docy features
- **Installation**: `pnpm dlx shadcn@latest add [component-name]` (if applicable)
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Form Integration**: React Hook Form compatibility
- **Validation**: Integration with CustomValidation system
- **Actions**: Support for FieldActions system
- **Accessibility**: WCAG 2.1 AA compliance

### 5. Key Features Required
List only features unique to this field type (not inherited from DocyFieldBase)

### 6. Usage Examples
Provide 3-5 realistic usage examples:
- Basic usage
- With validation
- With actions
- With computed properties
- Complex/advanced usage

### 7. Integration Requirements
- **DocyFieldBase**: Extends base field wrapper
- **DocyForm**: Integrates with form container
- **FilterQuery**: For computed properties
- **CustomValidation**: For field-specific validation
- **FieldActions**: For dynamic interactions

### 8. Dependencies Required
List only dependencies specific to this field type

### 9. Testing Requirements
- Unit tests for field-specific logic
- Integration tests with form system
- Visual tests for all variants
- Accessibility tests
- Performance tests if applicable

## Standard Props Analysis

### Props to Include
All field components should document these categories:

#### 1. Inherited from DocyFieldBase
```markdown
| `extends` | DocyFieldBase | - | Yes | Inherits all base field props (see DocyFieldBase.md) |
```

#### 2. Field-Specific Props
Only document props unique to this field type:
- Input-specific attributes (placeholder, maxLength, pattern, etc.)
- Validation-specific props
- Display/formatting props
- Options/data source props
- Behavior modification props

#### 3. Common Field-Specific Props Patterns
- `placeholder`: Input placeholder text
- `maxLength`: Maximum input length
- `minLength`: Minimum input length
- `pattern`: Regex validation pattern
- `options`: Array of selectable options
- `dataSource`: External data source
- `multiple`: Allow multiple selections
- `allowClear`: Show clear button
- `searchable`: Enable search functionality
- `format`: Display format pattern
- `mask`: Input mask pattern
- `prefix`: Input prefix text/icon
- `suffix`: Input suffix text/icon

### Props to Exclude
Do not document these props (inherited from DocyFieldBase):
- `name`, `label`, `required`, `disabled`, `hidden`
- `value`, `defaultValue`, `onChange`
- `validation`, `customValidations`
- `actions`, `computedHidden`, `computedDisabled`
- `columnSpan`, `rowSpan`, `className`
- Form state and context props

## Behavior Documentation Standards

### What to Document
1. **Input Handling**: How user input is processed
2. **Data Transformation**: How data is formatted/transformed
3. **Validation Logic**: Field-specific validation rules
4. **User Interactions**: Click, focus, blur, keyboard behaviors
5. **Display Logic**: How data is presented to users
6. **Integration Points**: How field interacts with form system

### What NOT to Document
1. Base field wrapper behavior (handled by DocyFieldBase)
2. Form submission logic (handled by DocyForm)
3. Generic validation system (handled by CustomValidation)
4. Action system mechanics (handled by FieldActions)

## Usage Examples Standards

### Example Categories
1. **Basic Usage**: Minimal props demonstration
2. **With Validation**: CustomValidation integration
3. **With Actions**: FieldActions integration
4. **With Computed Properties**: FilterQuery integration
5. **Advanced/Complex**: Multiple features combined

### Example Format
```tsx
// [Description of what this example demonstrates]
<DocyField[Type]
  name="fieldName"
  label="Field Label"
  [field-specific-props]
  [validation-props]
  [action-props]
/>
```

## Field Analysis Methodology

### 1. shadcn/ui Component Check
**FIRST STEP**: Always check if a shadcn/ui component exists for the field type:
1. Visit [shadcn/ui components](https://ui.shadcn.com/docs/components) to find matching component
2. If available, install using: `pnpm dlx shadcn@latest add [component-name]`
3. Plan to extend the shadcn component with Docy-specific features
4. Document the base shadcn component and additional features needed

### 2. Vue Component Analysis
For each field component:
1. Read the Vue component file
2. Identify field-specific props (ignore common props)
3. Analyze unique behaviors and features
4. Document validation patterns
5. Note integration requirements
6. Compare with shadcn/ui component capabilities

### 3. Props Classification
Classify each prop as:
- **Field-Specific**: Document fully
- **Common**: Reference DocyFieldBase
- **Deprecated**: Exclude from documentation

### 4. Behavior Analysis
Focus on:
- What makes this field type unique
- How it handles user input differently
- Special validation or formatting rules
- Integration with external systems

## Quality Checklist

### Documentation Completeness
- [ ] Component overview written
- [ ] Props table includes all field-specific props
- [ ] TypeScript interfaces provided
- [ ] Behavior section covers unique features
- [ ] 3-5 usage examples provided
- [ ] Integration requirements listed
- [ ] Testing requirements specified

### Technical Accuracy
- [ ] Props match Vue component analysis
- [ ] Behavior description is accurate
- [ ] Examples are realistic and complete
- [ ] Dependencies are correct
- [ ] Testing requirements are comprehensive

### Consistency Standards
- [ ] Follows documentation structure
- [ ] Uses consistent terminology
- [ ] Prop descriptions are clear
- [ ] Examples follow naming conventions
- [ ] Integration section is complete

## Field Priority Categories

### High Priority (Document First)
Basic form fields that are frequently used:
- DocyFieldText, DocyFieldTextarea, DocyFieldNumber
- DocyFieldCheckbox, DocyFieldSelect, DocyFieldDate
- DocyFieldPassword, DocyFieldEmail, DocyFieldPhone

### Medium Priority
Specialized but common fields:
- DocyFieldSelectMulti, DocyFieldRadioGroup
- DocyFieldSwitch, DocyFieldTime, DocyFieldUrl
- DocyFieldMoney, DocyFieldRating, DocyFieldStatus

### Low Priority
Complex or rarely used fields:
- DocyFieldCodeEditor, DocyFieldJsonEditor
- DocyFieldMarkdownEditor, DocyFieldHtmlEditor
- DocyFieldAvatarEditor, DocyFieldInlineForm

## Common Patterns

### Input Fields
- Text-based inputs (text, email, password, url)
- Number inputs (number, money, currency)
- Date/time inputs (date, time, duration)

### Selection Fields
- Single selection (select, radio group)
- Multiple selection (select multi, checkbox group)
- Complex selection (relation, user select)

### Rich Content Fields
- Editors (code, json, markdown, html)
- Media fields (file upload, avatar editor)
- Specialized fields (rating, status, color)

### Container Fields
- List fields (dynamic arrays)
- Inline fields (nested forms/data)
- Complex workflow fields (approval status)

## File Naming Convention
- File path: `/docs/react-components/form/DocyField[Type].md`
- Component name: `DocyField[Type]`
- Interface name: `[Type]FieldProps`

## Development Workflow
1. **Check shadcn/ui**: Search for matching component at [shadcn/ui components](https://ui.shadcn.com/docs/components)
2. **Install if available**: Run `pnpm dlx shadcn@latest add [component-name]`
3. **Analyze Vue component**: Read `/packages/components/form-view/src/field-[type]/`
4. **Plan extension**: Identify Docy-specific features to add to shadcn base
5. **Create documentation**: Follow this guide structure
6. **Update project.md**: Mark status as completed
7. **Review for completeness**: Check against quality checklist
8. **Move to next field**: Continue in priority order

## Notes
- **Always check shadcn/ui first**: Use existing shadcn components as base when available
- **Install via CLI**: Use `pnpm dlx shadcn@latest add [component-name]` for installation
- **Extend, don't replace**: Build Docy features on top of shadcn base components
- Focus on field-specific functionality only
- Assume DocyFieldBase handles common field behavior
- Provide practical, realistic usage examples
- Ensure all examples are valid React/TypeScript code
- Maintain consistency with existing documentation patterns
- Document integration points but not implementation details