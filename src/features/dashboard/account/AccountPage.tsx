import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function UpdateProfilePage() {
    
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto p-6">
        <div className="max-w-6xl mx-auto">
          

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           
            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Profile</h2>
                  <p className="text-gray-500 text-sm mb-6">This is how others will see you on the site.</p>

                  <div className="space-y-6">
                    {/* Username */}
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm font-medium">
                        Username
                      </label>
                      <Input id="username" defaultValue="shadcn" className="bg-white border-gray-200" />
                      <p className="text-gray-500 text-sm">
                        This is your public display name. It can be your real name or a pseudonym. You can only change
                        this once every 30 days.
                      </p>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Select>
                        <SelectTrigger className="bg-white border-gray-200">
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email1">email@example.com</SelectItem>
                          <SelectItem value="email2">another@example.com</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-gray-500 text-sm">
                        You can manage verified email addresses in your email settings.
                      </p>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <label htmlFor="bio" className="text-sm font-medium">
                        Bio
                      </label>
                      <Textarea
                        id="bio"
                        defaultValue="I own a computer."
                        className="bg-white border-gray-200 min-h-[80px]"
                      />
                      <p className="text-gray-500 text-sm">
                        You can @mention other users and organizations to link to them.
                      </p>
                    </div>

                    {/* URLs */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">URLs</label>
                      <p className="text-gray-500 text-sm">
                        Add links to your website, blog, or social media profiles.
                      </p>
                      <div className="space-y-2">
                        <Input defaultValue="https://shadcn.com" className="bg-white border-gray-200" />
                        <Input defaultValue="http://twitter.com/shadcn" className="bg-white border-gray-200" />
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        Add URL
                      </Button>
                    </div>

                    <Button className="mt-6">Update profile</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
