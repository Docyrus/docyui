import * as React from "react"
import DocyButton from "./docy-button"

export function DocyButtonExample() {
  const [loading, setLoading] = React.useState(false)
  const [clickCount, setClickCount] = React.useState(0)

  const handleAsyncAction = async () => {
    setLoading(true)
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    setClickCount(prev => prev + 1)
  }

  const handleDestructiveAction = () => {
    alert("Destructive action confirmed!")
    setClickCount(prev => prev + 1)
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">DocyButton Examples</h1>
        <p className="text-muted-foreground">
          Comprehensive examples of the DocyButton component with all variants and features.
        </p>
        <p className="text-sm text-muted-foreground">
          Button clicks: {clickCount}
        </p>
      </div>

      {/* Basic Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <DocyButton 
            variant="default"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Default
          </DocyButton>
          <DocyButton 
            variant="destructive"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Destructive
          </DocyButton>
          <DocyButton 
            variant="outline"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Outline
          </DocyButton>
          <DocyButton 
            variant="secondary"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Secondary
          </DocyButton>
          <DocyButton 
            variant="ghost"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Ghost
          </DocyButton>
          <DocyButton 
            variant="link"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Link
          </DocyButton>
        </div>
      </section>

      {/* Button Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <DocyButton 
            size="sm"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Small
          </DocyButton>
          <DocyButton 
            size="default"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Default
          </DocyButton>
          <DocyButton 
            size="lg"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Large
          </DocyButton>
          <DocyButton 
            size="icon"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            <span>⭐</span>
          </DocyButton>
        </div>
      </section>

      {/* Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons with Icons</h2>
        <div className="flex flex-wrap gap-4">
          <DocyButton 
            icon="save"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Save
          </DocyButton>
          <DocyButton 
            icon="download"
            iconPosition="right"
            variant="outline"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Download
          </DocyButton>
          <DocyButton 
            icon="plus"
            size="icon"
            onClick={() => setClickCount(prev => prev + 1)}
          />
          <DocyButton 
            icon="trash"
            variant="destructive"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Delete
          </DocyButton>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Loading States</h2>
        <div className="flex flex-wrap gap-4">
          <DocyButton 
            loading={loading}
            onClick={handleAsyncAction}
          >
            {loading ? "Processing..." : "Start Process"}
          </DocyButton>
          <DocyButton 
            loading={loading}
            loadingText="Saving..."
            icon="save"
            variant="outline"
            onClick={handleAsyncAction}
          >
            Save Document
          </DocyButton>
          <DocyButton 
            loading
            variant="secondary"
          >
            Always Loading
          </DocyButton>
        </div>
      </section>

      {/* Destructive Confirmation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Destructive Confirmation</h2>
        <div className="flex flex-wrap gap-4">
          <DocyButton 
            destructive
            variant="destructive"
            onClick={handleDestructiveAction}
          >
            Delete Item
          </DocyButton>
          <DocyButton 
            destructive
            variant="destructive"
            confirmText="Delete all data?"
            confirmTimeout={5000}
            onClick={handleDestructiveAction}
          >
            Delete All
          </DocyButton>
          <DocyButton 
            destructive
            variant="outline"
            confirmText="Remove user?"
            icon="trash"
            onClick={handleDestructiveAction}
          >
            Remove User
          </DocyButton>
        </div>
      </section>

      {/* Full Width */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Full Width</h2>
        <div className="space-y-3">
          <DocyButton 
            fullWidth
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Full Width Button
          </DocyButton>
          <DocyButton 
            fullWidth
            variant="outline"
            icon="arrow-right"
            iconPosition="right"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Continue to Next Step
          </DocyButton>
        </div>
      </section>

      {/* Disabled States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled States</h2>
        <div className="flex flex-wrap gap-4">
          <DocyButton disabled>
            Disabled Default
          </DocyButton>
          <DocyButton 
            disabled
            variant="destructive"
            icon="trash"
          >
            Disabled Destructive
          </DocyButton>
          <DocyButton 
            disabled
            variant="outline"
            loading
          >
            Disabled Loading
          </DocyButton>
        </div>
      </section>

      {/* Complex Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Complex Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg space-y-3">
            <h3 className="font-medium">Form Actions</h3>
            <div className="flex gap-3">
              <DocyButton 
                variant="outline"
                onClick={() => setClickCount(prev => prev + 1)}
              >
                Cancel
              </DocyButton>
              <DocyButton 
                icon="save"
                loading={loading}
                loadingText="Saving..."
                onClick={handleAsyncAction}
              >
                Save Changes
              </DocyButton>
            </div>
          </div>

          <div className="p-4 border rounded-lg space-y-3">
            <h3 className="font-medium">Dangerous Action with Confirmation</h3>
            <DocyButton 
              destructive
              variant="destructive"
              confirmText="This will permanently delete your account. Are you sure?"
              confirmTimeout={8000}
              icon="trash"
              onClick={() => alert("Account deleted!")}
            >
              Delete Account
            </DocyButton>
          </div>

          <div className="p-4 border rounded-lg space-y-3">
            <h3 className="font-medium">Call-to-Action</h3>
            <DocyButton 
              size="lg"
              fullWidth
              icon="arrow-right"
              iconPosition="right"
              onClick={() => setClickCount(prev => prev + 1)}
            >
              Get Started Now
            </DocyButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DocyButtonExample